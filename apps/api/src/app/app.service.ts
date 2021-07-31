import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { TablePost, UploadImageResponse } from '@esaiharamasukoi/api-interfaces';
import { MemoryStoredFile } from 'nestjs-form-data';
import { map, tap } from 'rxjs/operators';
import * as FormData from 'form-data';
import { environment } from '../environments/environment';

const ACCESS_TOKEN = environment.accessToken;

@Injectable()
export class AppService {
  constructor(private http: HttpService) { }
  async uploadImage(teamId: string, image: MemoryStoredFile): Promise<UploadImageResponse> {
    try {
      const meta = await this.postAttachmentsPolicies(teamId, image); 
      await this.uploadS3(image, meta);
      return {url: meta.attachment.url};
    } catch (error) {
      console.error(error);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error'
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    } 
  }

  async createTablePost(post: TablePost): Promise<TablePost> {
    try {
      const name = `プルリク画像置き場/test`;
      const data = buildCreatePostRequestData(name, post.before, post.after);
      const url = await this.createPost(post.teamId, data);
      return {...post, url, name};
    } catch (error) {
      console.error(error);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error'
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    } 
  }

  private async createPost(teamId: string, data: CreatePostRequestData): Promise<string> {
    const endpoint = `https://api.esa.io/v1/teams/${teamId}/posts`;
    const headers = { Authorization: `Bearer ${ACCESS_TOKEN}`};
    return await this.http.post(endpoint, data, {headers}).pipe(
      map(res => res.data),
      tap(data => console.debug('res.data:', data)),
      map(data => data.url),
    ).toPromise();
  }

  private async postAttachmentsPolicies(teamId: string, file: MemoryStoredFile): Promise<S3MetaData> {
    const endpoint = `https://api.esa.io/v1/teams/${teamId}/attachments/policies`;
    const headers = { Authorization: `Bearer ${ACCESS_TOKEN}`};
    const data = {
      size: file.size,
      name: file.originalName,
      type: file.mimetype,
    };
    return await this.http.post<S3MetaData>(endpoint, data, {headers}).pipe(
      map(res => res.data)
    ).toPromise();
  }

  private async uploadS3(file: MemoryStoredFile, meta: S3MetaData): Promise<any> {
    const data = this.buildS3FormData(file, meta);
    const headers = this.getHeadersByFormData(data);
    return await this.http.post(meta.attachment.endpoint, data, {headers}).toPromise();
  }

  private buildS3FormData(file: MemoryStoredFile, meta: S3MetaData): FormData {
    const data = new FormData();
    Object.entries(meta.form).forEach(([k, v]) => data.append(k, v));
    data.append('file', file.buffer, file.originalName);
    return data;
  }

  private getHeadersByFormData(data: FormData) {
    return {...data.getHeaders(), 'Content-Length': data.getLengthSync()};
  }
}

const buildCreatePostRequestData = (name: string, before: string, after: string): CreatePostRequestData => ({
  post: {
    name,
    body_md: buildBody(before, after),
    wip: true
  }
});

const buildBody = (before: string, after: string): string => `
  |before|after|
  |---|---|
  |![before](${before})|![after](${after})|
`;


export interface S3MetaData {
  attachment: {
    endpoint: string,
    url: string,
  },
  form: {
    AWSAccessKeyId: string,
    signature: string,
    policy: string,
    key: string,
    'Content-Type': string,
    'Cache-Control': string,
    'Content-Disposition': string,
    acl: string,
  }
}

export interface CreatePostRequestData {
  post:{
    name: string;
    body_md?: string;
    tags?: string[];
    category?: string;
    wip?: boolean;
    message?: string;
  }
}