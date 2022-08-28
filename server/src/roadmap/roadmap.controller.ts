// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import { AuthRequest } from './../types/AuthRequest';
import { IsAuthGuard } from './../is-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('roadmap')
@ApiTags('Roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Post()
  create(@Body() createRoadmapDto: CreateRoadmapDto, @Req() req: AuthRequest) {
    return this.roadmapService.create(createRoadmapDto, req.user);
  }

  @Get()
  findAll() {
    return this.roadmapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roadmapService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoadmapDto: UpdateRoadmapDto,
    @Req() req: AuthRequest,
  ) {
    return this.roadmapService.update(+id, updateRoadmapDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.roadmapService.remove(+id, req.user);
  }
}
