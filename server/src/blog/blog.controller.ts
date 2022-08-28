// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsAuthGuard } from './../is-auth.guard';
import { AuthRequest } from './../types/AuthRequest';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @Req() req: AuthRequest) {
    return this.blogService.create(createBlogDto, req.user);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @SetMetadata('auth', [])
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.blogService.remove(+id, req.user);
  }
}
