import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(

  // );
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // extra security eg to sanitize
  //   }),
  // );
  await app.listen(4300);
}
bootstrap();
