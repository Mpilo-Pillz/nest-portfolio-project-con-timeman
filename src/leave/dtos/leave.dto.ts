import { Expose, Transform } from 'class-transformer';

export class LeaveDto {
  @Expose()
  id: number;
  @Expose()
  numberOfDays: number;
  
  @Transform(({obj}) => obj.user.id)
  @Expose()
  userId: number
}
