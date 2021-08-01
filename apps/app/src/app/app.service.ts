import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TablePost, UploadImageResponse } from '@esaiharamasukoi/api-interfaces';
import { FormBuilder } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { LoadingService, SnackBarService } from './_shared/services';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    public form: FormBuilder,
    public clipboard: Clipboard,
    public snackBar: SnackBarService,
    public loading: LoadingService,
  ) { }

  uploadImage(teamId:string, image: File): Promise<UploadImageResponse> {
    const data = new FormData();
    data.append('image', image, image.name);
    const headers = new HttpHeaders({'Accept': 'application/json'});
    const endpoint = `/api/teams/${teamId}/images`;
    return this.http.post<UploadImageResponse>(endpoint, data, {headers: headers}).toPromise();
  }

  createPost({teamId, before, after}: TablePost): Promise<TablePost> {
    const endpoint = `/api/teams/${teamId}/posts`;
    return this.http.post<TablePost>(endpoint, {before, after}).toPromise();
  }
}