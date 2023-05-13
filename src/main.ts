import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['mfanakhiti'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // extra security eg to sanitize
    }),
  );
  await app.listen(4300);
}
bootstrap();
