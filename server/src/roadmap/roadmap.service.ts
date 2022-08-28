// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import { CategoryService } from './../category/category.service';
import { Roadmap } from './entities/roadmap.entity';
import { User } from './../users/entities/user.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoadmapService {
  constructor(
    @InjectRepository(Roadmap)
    private readonly roadmapRepo: Repository<Roadmap>,

    private readonly categorySerive: CategoryService,
  ) {}
  async create(createRoadmapDto: CreateRoadmapDto, user: User) {
    const category = await this.categorySerive.findOneById(
      createRoadmapDto.categoryId,
    );
    return this.roadmapRepo.save({
      ...createRoadmapDto,
      categoryId: category.id,
      userId: user.id,
    });
  }

  findAll() {
    return this.roadmapRepo
      .createQueryBuilder('roadmap')
      .leftJoinAndSelect('roadmap.category', 'category')
      .leftJoinAndSelect('roadmap.user', 'user')
      .orderBy('roadmap.createdAt', 'DESC')
      .paginate();
  }

  async findOne(id: number) {
    const roadmap = await this.roadmapRepo.findOne(id, {
      relations: ['category', 'user'],
    });
    if (!roadmap || !roadmap.id) {
      throw new NotFoundException('Roadmap not found');
    }
    return roadmap;
  }

  async update(id: number, updateRoadmapDto: UpdateRoadmapDto, user: User) {
    const roadmap = await this.findOne(id);
    if (roadmap.userId !== user.id) {
      throw new UnauthorizedException();
    }
    if (updateRoadmapDto.title && updateRoadmapDto.title.trim().length) {
      roadmap.title = updateRoadmapDto.title;
    }
    if (
      updateRoadmapDto.description &&
      updateRoadmapDto.description.trim().length
    ) {
      roadmap.description = updateRoadmapDto.description;
    }
    if (updateRoadmapDto.data && updateRoadmapDto.data.trim().length) {
      roadmap.data = updateRoadmapDto.data;
    }
    return this.roadmapRepo.save(roadmap);
  }

  async remove(id: number, user: User) {
    const roadmap = await this.findOne(id);
    if (roadmap.userId !== user.id) {
      throw new UnauthorizedException();
    }
    const isDeleted = await this.roadmapRepo.delete(id);
    return !!isDeleted;
  }
}
