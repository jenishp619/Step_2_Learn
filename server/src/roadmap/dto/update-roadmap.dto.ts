// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import { PartialType } from '@nestjs/swagger';
import { CreateRoadmapDto } from './create-roadmap.dto';

export class UpdateRoadmapDto extends PartialType(CreateRoadmapDto) {}
