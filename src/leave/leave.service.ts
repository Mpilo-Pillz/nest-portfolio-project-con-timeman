import { Injectable } from '@nestjs/common';

@Injectable()
export class LeaveService {
  addNumberOfLeaveDays(numberOfDays) {
    console.log(numberOfDays);
  }
}
