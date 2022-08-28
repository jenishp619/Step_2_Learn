import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 *
 * Author: Janvi Patel
 * Banner ID: B00896196
 * Email: jn398689@dal.ca
 */
export class ConnectUserDTO {
  @IsString()
  @ApiProperty()
  @IsOptional()
  email: string;

}
