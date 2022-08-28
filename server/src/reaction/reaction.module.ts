/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { CategoryService } from './../category/category.service';
import { RoadmapService } from './../roadmap/roadmap.service';
import { Category } from './../category/entities/category.entity';
import { Roadmap } from './../roadmap/entities/roadmap.entity';
import { Reaction } from './entities/reaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction, Roadmap, Category])],
  controllers: [ReactionController],
  providers: [ReactionService, RoadmapService, CategoryService],
})
export class ReactionModule {}
