import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    HttpModule,
    NestjsFormDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
