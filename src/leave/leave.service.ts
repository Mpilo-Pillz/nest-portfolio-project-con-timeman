import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leave } from './leave.entity';
import { Repository } from 'typeorm';
import { AddLeaveDaysDto } from './dtos/add-leave-days.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class LeaveService {
  constructor(@InjectRepository(Leave) private repository: Repository<Leave>) {}
  addNumberOfLeaveDays(numberOfDaysDto: AddLeaveDaysDto, user: User) {
    const leaveDays = this.repository.create(numberOfDaysDto);
    leaveDays.user = user;
    return this.repository.save(leaveDays);
  }
}
