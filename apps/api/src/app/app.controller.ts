import { TablePost, Team, UploadImageResponse } from '@esaiharamasukoi/api-interfaces';
import { Body, Controller, Get, Headers, Param, Post, Query, Res } from '@nestjs/common';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';
import { OAuth2 } from 'oauth';
import { promisify } from 'util';
import * as ejs from 'ejs';

import { AppService } from './app.service';
import { environment } from '../environments/environment';
import { CALLBACK_TEMPLATE } from './shared/templates/callback';

const auth = new OAuth2(
  environment.oauth.clientId, 
  environment.oauth.clientSecret,
  'https://api.esa.io/',
  'oauth/authorize',
  'oauth/token',
  null,
);

export class FormImageData {
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  image: MemoryStoredFile;
}

@Controller()
export class AppController {
  constructor(private readonly app: AppService) {}

  @Get('oauth')
  async oauth(@Res() res: Response): Promise<any> {
    const url = auth.getAuthorizeUrl({
      redirect_uri: environment.oauth.callbackUrl,
      scope: 'read write',
      response_type: 'code',
      // TODO: CSRF Protection
      state: '',
    });
    res.redirect(url);
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: Response): Promise<any> {
    const getOAuthAccessToken = promisify(auth.getOAuthAccessToken.bind(auth));
    const accessToken = await getOAuthAccessToken(code, {
      grant_type: 'authorization_code',
      redirect_uri: environment.oauth.callbackUrl,
    });
    
    res.send(ejs.render(CALLBACK_TEMPLATE, {
      origin: environment.origin,
      accessToken: accessToken
    }));
  }

  @Get('teams')
  async getTeams(@Headers('Authorization') auth: string): Promise<Team[]> {
    const token = this.getAccessToken(auth);
    return await this.app.getTeams(token);
  }

  @Post('teams/:teamId/images')
  @FormDataRequest()
  async uploadImage(
    @Headers('Authorization') auth: string,
    @Param('teamId') teamId: string, 
    @Body() data: FormImageData
  ): Promise<UploadImageResponse> {
    const token = this.getAccessToken(auth);
    return await this.app.uploadImage(token, teamId, data.image);
  }

  @Post('teams/:teamId/posts')
  async createPost(
    @Headers('Authorization') auth: string,
    @Param('teamId') teamId: string, 
    @Body() post: TablePost
  ): Promise<any> {
    const token = this.getAccessToken(auth);
    return await this.app.createTablePost(token, {...post, teamId});
  }

  private getAccessToken(auth: string): string {
    return auth.split(' ')?.[1];
  }
}
