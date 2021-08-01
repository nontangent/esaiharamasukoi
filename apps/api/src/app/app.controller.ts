import { TablePost, Team, UploadImageResponse } from '@esaiharamasukoi/api-interfaces';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile, FormDataRequest } from 'nestjs-form-data';

import { AppService } from './app.service';

export class FormImageData {
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  image: MemoryStoredFile;
}

@Controller()
export class AppController {
  constructor(private readonly app: AppService) {}

  @Get('teams')
  async getTeams(): Promise<Team[]> {
    return await this.app.getTeams();
  }

  @Post('teams/:teamId/images')
  @FormDataRequest()
  async uploadImage(@Param('teamId') teamId: string, @Body() data: FormImageData): Promise<UploadImageResponse> {
    return await this.app.uploadImage(teamId, data.image);
  }

  @Post('teams/:teamId/posts')
  async createPost(@Param('teamId') teamId: string, @Body() post: TablePost): Promise<any> {
    console.debug('teamId:', teamId);
    console.debug('post:', post);
    return await this.app.createTablePost({...post, teamId});
  }
}
