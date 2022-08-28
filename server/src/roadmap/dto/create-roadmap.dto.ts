// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoadmapDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty({ nullable: true })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  data: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
