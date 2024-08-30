import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  );

  app.enableCors({
    origin: 'https://main.d3pvypseairen5.amplifyapp.com',
    credentials: true,
  });

  app.use(cookieParser());

  const express = require('express');
  const cors = require('cors');
  
  app.use(
    cors({
      origin: 'https://main.d3pvypseairen5.amplifyapp.com', // Your frontend URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }),
  );

  await app.listen(3001);
}
bootstrap();
