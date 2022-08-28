import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  firstName: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  lastName: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  profileUrl: string;
}
