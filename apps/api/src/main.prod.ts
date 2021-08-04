import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app/app.module';

const server = express();

export async function bootstrap(expressInstance) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.setGlobalPrefix('api');
  await app.init();
}

export const api = functions.region('us-central1')
.https.onRequest(async (req, res) => (await bootstrap(server), server(req, res)));