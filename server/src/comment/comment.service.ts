/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { RoadmapService } from './../roadmap/roadmap.service';
import { User } from './../users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    private readonly roadmapService: RoadmapService,
  ) {}
  async create(createCommentDto: CreateCommentDto, user: User) {
    const roadmap = await this.roadmapService.findOne(
      createCommentDto.roadmapId,
    );
    return this.commentRepo.save({
      ...createCommentDto,
      userId: user.id,
      roadmapId: roadmap.id,
    });
  }

  findAllByRoadMapId(id: number) {
    return this.commentRepo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.roadmapId = :id', { id })
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    const comment = await this.commentRepo.findOne(id, {
      relations: ['user', 'roadmap'],
    });
    if (!comment || !comment.id) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, user: User) {
    const comment = await this.findOne(id);
    if (comment.userId !== user.id) {
      throw new UnauthorizedException();
    }
    if (updateCommentDto.content && updateCommentDto.content.trim().length) {
      comment.content = updateCommentDto.content;
    }
    return this.commentRepo.save(comment);
  }

  async remove(id: number, user: User) {
    const comment = await this.findOne(id);

    if (comment.userId === user.id || comment.roadmap.userId === user.id) {
      const isDeleted = await this.commentRepo.delete(id);
      return !!isDeleted;
    }

    throw new UnauthorizedException();
  }
}
