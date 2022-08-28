// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
