import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Validators } from '@angular/forms';
import { TablePost } from '@esaiharamasukoi/api-interfaces';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'esaiharamasukoi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form = this.app.form.group({
    teamId: ['neco', [Validators.required, Validators.nullValidator]],
    before: [null, [Validators.required, Validators.nullValidator]],
    after: [null, [Validators.required, Validators.nullValidator]],
  });

  canSubmit = false;
  clipValue: string | null = null;

  isLoading$ = this.app.loading.isLoading$.pipe(startWith(false));

  constructor(private app: AppService) { }

  ngOnInit(): void {
    this.form.get('before')!.valueChanges.subscribe(() => this.canSubmit = true);
    this.form.get('after')!.valueChanges.subscribe(() => this.canSubmit = true);
  }

  onBeforeFileSelected(file: File) {
    this.onFileSelected('before', file);
  }

  onAfterFileSelected(file: File) {
    this.onFileSelected('after', file);
  }

  private onFileSelected(name: 'before' | 'after', file: File) {
    const teamId: string | null = this.form.get('teamId')?.value;
    if (!teamId) return;

    this.app.loading.setKey('[App] Upload Image');
    this.app.uploadImage(teamId, file).then(({url}) => {
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

    const data = this.form.value as TablePost;
    this.app.loading.setKey('[App] Create Post');
    this.app.createPost(data).then(post => {
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
