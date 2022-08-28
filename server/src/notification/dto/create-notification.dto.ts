import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

/**
 *
 * Author: Janvi Patel
 * Banner ID: B00896196
 * Email: jn398689@dal.ca
 */
export class CreateNotificationDto {

 @IsString()
  @ApiProperty()
  @IsOptional()
  type: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  content: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  userid: string;
}
