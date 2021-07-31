import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app/app.module';

export async function bootstrap(expressInstance) {
  const app = await NestFactory.create(
    AppModule, 
    new ExpressAdapter(expressInstance)
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  await app.init();
}

const expressServer = express();

export const api = functions.region('us-central1')
.https.onRequest(async (request, response) => {
    await bootstrap(expressServer);
    expressServer(request, response);
});