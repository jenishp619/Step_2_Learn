/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { CategoryService } from './../category/category.service';
import { Category } from './../category/entities/category.entity';
import { RoadmapService } from './../roadmap/roadmap.service';
import { Roadmap } from './../roadmap/entities/roadmap.entity';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Roadmap, Category])],
  controllers: [CommentController],
  providers: [CommentService, RoadmapService, CategoryService],
})
export class CommentModule {}
