import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TablePost, UploadImageResponse } from '@esaiharamasukoi/api-interfaces';
import { FormBuilder } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
    public form: FormBuilder,
  ) { }

  uploadImage(teamId:string, image: File): Promise<UploadImageResponse> {
    const data = new FormData();
    data.append('image', image, image.name);
    const headers = new HttpHeaders({'Accept': 'application/json'});
    const endpoint = `/api/teams/${teamId}/images`;
    return this.http.post<UploadImageResponse>(endpoint, data, {headers: headers}).toPromise();
  }

  createPost({teamId, before, after}: TablePost): Promise<any> {
    const endpoint = `/api/teams/${teamId}/posts`;
    return this.http.post(endpoint, {before, after}).toPromise();
  }
}