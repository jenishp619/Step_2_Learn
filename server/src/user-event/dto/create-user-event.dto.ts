/* 
* Author: Jay Kirankumar Patel
* Banner: B00906433
* E-mail: jaykiranpatel@dal.ca
*/
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserEventDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  eventId: number;
}
