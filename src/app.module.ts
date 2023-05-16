import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { LeaveModule } from './leave/leave.module';
import { Leave } from './leave/leave.entity';
import { APP_PIPE } from '@nestjs/core';
// import cookieSession from 'cookie-session';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Leave],
      synchronize: true,
    }),
    UsersModule,
    LeaveModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // extra security eg to sanitize
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['mfanakhiti'],
        }),
      )
      .forRoutes('*');
  }
}
