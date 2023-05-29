import { Expose } from 'class-transformer';

export class LeaveDto {
  @Expose()
  id: number;
  @Expose()
  numberOfDays: number;
}
