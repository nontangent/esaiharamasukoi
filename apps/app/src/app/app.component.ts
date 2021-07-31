import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Validators } from '@angular/forms';
import { TablePost } from '@esaiharamasukoi/api-interfaces';

@Component({
  selector: 'esaiharamasukoi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form = this.app.form.group({
    teamId: ['neco', [Validators.required, Validators.nullValidator]],
    before: [null, [Validators.required, Validators.nullValidator]],
    after: [null, [Validators.required, Validators.nullValidator]],
  });

  constructor(private app: AppService) { }

  onBeforeFileSelected(file: File) {
    this.onFileSelected('before', file);
  }

  onAfterFileSelected(file: File) {
    this.onFileSelected('after', file);
  }

  private onFileSelected(name: 'before' | 'after', file: File) {
    const teamId: string | null = this.form.get('teamId')?.value;
    if (!teamId) return;
    this.app.uploadImage(teamId, file).then(({url}) => this.form.get(name)!.setValue(url));
  }

  onSubmitButtonClick() {
    if (this.form.errors) return;
    const data = this.form.value as TablePost;
    console.debug(data);
    this.app.createPost(data)
  }
}
