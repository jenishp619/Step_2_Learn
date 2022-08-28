// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
