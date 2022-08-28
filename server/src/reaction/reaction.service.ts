/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RoadmapService } from './../roadmap/roadmap.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { Reaction } from './entities/reaction.entity';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepo: Repository<Reaction>,
    private readonly roadmapService: RoadmapService,
  ) {}
  async create(createReactionDto: CreateReactionDto, id: number, user: User) {
    const roadmap = await this.roadmapService.findOne(id);
    return this.reactionRepo.save({
      emoji: createReactionDto.emoji,
      roadmap,
      user,
    });
  }

  async findAllByUser(id: number, user: User) {
    const fav = await this.reactionRepo.findOne({
      where: { roadmapId: id, userId: user.id },
    });
    if (!fav || !fav.userId) {
      throw new NotFoundException('reaction not found');
    }
    return fav;
  }

  async findAll(id: number) {
    const totalCount = await this.reactionRepo
      .createQueryBuilder('reaction')
      .where('reaction.roadmapId = :id', { id })
      .getCount();

    return { totalCount };
  }

  async remove(id: number, user: User) {
    const reaction = await this.reactionRepo.findOne({
      where: { roadmapId: id, userId: user.id },
    });
    if (!reaction || !reaction.userId) {
      return false;
    }
    await this.reactionRepo.delete(reaction);
    return true;
  }
}
