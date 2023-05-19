import { IsNumber } from 'class-validator';

export class AddLeaveDaysDto {
  @IsNumber()
  numberOfDays: number;
}
