import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AddLeaveDaysDto } from './dtos/add-leave-days.dto';
import { LeaveService } from './leave.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('leave')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  @Post()
  @UseGuards(AuthGuard)
  addNumberOfLeaveDays(@Body() body: AddLeaveDaysDto) {
    return this.leaveService.addNumberOfLeaveDays(body);
  }
}
