import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteDto } from './create-favorite.dto';

/**
    * 
    * Author: Janvi Patel
    * Banner ID: B00896196
    * Email: jn398689@dal.ca
*/
export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {}
