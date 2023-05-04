import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { LeaveModule } from './leave/leave.module';
import { Leave } from './leave/leave.entity';

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
  providers: [AppService],
})
export class AppModule {}
