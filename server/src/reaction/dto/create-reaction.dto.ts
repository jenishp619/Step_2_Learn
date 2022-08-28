/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReactionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  emoji: string;
}
