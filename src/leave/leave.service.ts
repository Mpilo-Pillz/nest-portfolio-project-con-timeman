import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leave } from './leave.entity';
import { Repository } from 'typeorm';
import { AddLeaveDaysDto } from './dtos/add-leave-days.dto';

@Injectable()
export class LeaveService {
  constructor(@InjectRepository(Leave) private repository: Repository<Leave>) {}
  addNumberOfLeaveDays(numberOfDaysDto: AddLeaveDaysDto) {
    const leaveDays = this.repository.create(numberOfDaysDto);
    return this.repository.save(leaveDays);
  }
}
