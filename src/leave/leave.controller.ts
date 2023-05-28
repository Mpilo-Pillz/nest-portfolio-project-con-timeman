import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AddLeaveDaysDto } from './dtos/add-leave-days.dto';
import { LeaveService } from './leave.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { LeaveDto } from './dtos/leave.dto';

@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(LeaveDto)
  addNumberOfLeaveDays(
    @Body() body: AddLeaveDaysDto,
    @CurrentUser() user: User,
  ) {
    return this.leaveService.addNumberOfLeaveDays(body, user);
  }
}
