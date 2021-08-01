import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TablePost, Team, UploadImageResponse } from '@esaiharamasukoi/api-interfaces';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { LoadingService, SheetsService, SnackBarService } from './_shared/services';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private http: HttpClient,
    public form: FormBuilder,
    public clipboard: Clipboard,
    public snackBar: SnackBarService,
    public sheets: SheetsService,
    public loading: LoadingService,
    public router: Router,
  ) { }

  getTeams(): Observable<Team[]> {
    const endpoint = `/api/teams`;
    return this.http.get<Team[]>(endpoint);
  }

  uploadImage(teamId:string, image: File): Promise<UploadImageResponse> {
    const data = new FormData();
    data.append('image', image, image.name);
    const headers = new HttpHeaders({'Accept': 'application/json'});
    const endpoint = `/api/teams/${teamId}/images`;
    return this.http.post<UploadImageResponse>(endpoint, data, {headers}).toPromise();
  }

  createPost({teamId, before, after}: TablePost): Promise<TablePost> {
    const endpoint = `/api/teams/${teamId}/posts`;
    return this.http.post<TablePost>(endpoint, {before, after}).toPromise();
  }
}