import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Validators } from '@angular/forms';
import { TablePost, Team } from '@esaiharamasukoi/api-interfaces';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'pages-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss']
})
export class TeamsPage implements OnInit {
  form = this.app.form.group({
    before: [null, [Validators.required, Validators.nullValidator]],
    after: [null, [Validators.required, Validators.nullValidator]],
  });

  canSubmit = false;
  clipValue: string | null = null;

  teamId: string | null = null;
  teamId$ = this.route.paramMap.pipe(map(paramMap => paramMap.get('teamId') ?? null));

  teams: Team[] = [];
  teams$ = this.teamId$.pipe(
    filter(teamId => !teamId),
    switchMapTo(this.app.getTeams()),
  );

  constructor(
    private app: AppService, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form.get('before')!.valueChanges.subscribe(() => this.canSubmit = true);
    this.form.get('after')!.valueChanges.subscribe(() => this.canSubmit = true);
    this.teamId$.subscribe(teamId => this.teamId = teamId);
    this.teams$.pipe(filter(teams => !!teams.length)).subscribe(teams => {
      teams.length === 1 ? this.navigateToTeamPage(teams?.[0]?.name) : this.openSheets(teams);
    });
  }

  openSheets(teams: Team[]): void {
    const buildItems = (teams: Team[]) => teams.map(team => ({id: team.name, label: team.description}));
    const sheets = this.app.sheets.openMenuSheet(buildItems(teams));
    sheets.afterDismissed().toPromise().then(item => item && this.navigateToTeamPage(item.id));
  }

  navigateToTeamPage(id: string): void {
    this.app.router.navigate(['teams', id]);
  }

  onBeforeFileSelected(file: File): void {
    this.onFileSelected('before', file);
  }

  onAfterFileSelected(file: File): void {
    this.onFileSelected('after', file);
  }

  private onFileSelected(name: 'before' | 'after', file: File) {
    if (!this.teamId) return;

    this.app.loading.setKey('[App] Upload Image');
    this.app.uploadImage(this.teamId, file).then(({url}) => {
      this.form.get(name)!.setValue(url);
      this.app.snackBar.openSnackBar(`${name}のアップロードが完了しました`);
    }).catch((error) => {
      console.error(error);
      this.app.snackBar.openSnackBar('エラーが発生しました。コンソールを確認してください。');
    }).finally(() => {
      this.app.loading.removeKey('[App] Upload Image');
    });
  }

  onSubmitButtonClick() {
    if (this.form.invalid) {
      this.app.snackBar.openSnackBar('before afterを選択してください');
      return;
    }

    if (!this.canSubmit) {
      this.copyValue();
      this.app.snackBar.openSnackBar('クリップボードにコピーしました。');
      return;
    }

    if (!this.teamId) return;

    const data = this.form.value as TablePost;
    this.app.loading.setKey('[App] Create Post');
    this.app.createPost({...data, teamId: this.teamId}).then(post => {
      this.clipValue = `[${post.name}](${post.url})`;
      this.canSubmit = false;
      this.copyValue();
      this.app.snackBar.openSnackBar('記事作成し、クリップボードにコピーしました。');
    }).catch(err => {
      console.error(err);
      this.app.snackBar.openSnackBar('エラーが発生しました。コンソールを確認してください。');
    }).finally(() => {
      this.app.loading.removeKey('[App] Create Post');
    });
  }

  private copyValue() {
    if (!this.clipValue) return;
    this.app.clipboard.copy(this.clipValue);
  }
}
