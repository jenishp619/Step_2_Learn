/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/types/AuthRequest';
import { IsAuthGuard } from './../is-auth.guard';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionService } from './reaction.service';

@Controller('reaction')
@ApiTags('Reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Post('/:id')
  create(
    @Body() createReactionDto: CreateReactionDto,
    @Req() req: AuthRequest,
    @Param('id') id: string,
  ) {
    return this.reactionService.create(createReactionDto, +id, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Get('/user/:roadmapId')
  findAllByUser(@Param('roadmapId') id: string, @Req() req: AuthRequest) {
    return this.reactionService.findAllByUser(+id, req.user);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.reactionService.findAll(+id);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.reactionService.remove(+id, req.user);
  }
}
