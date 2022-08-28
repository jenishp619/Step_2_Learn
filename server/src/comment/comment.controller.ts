/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: AuthRequest) {
    return this.commentService.create(createCommentDto, req.user);
  }

  @Get('/roadmap/:id')
  findAll(@Param('id') id: string) {
    return this.commentService.findAllByRoadMapId(+id);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: AuthRequest,
  ) {
    return this.commentService.update(+id, updateCommentDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.commentService.remove(+id, req.user);
  }
}
