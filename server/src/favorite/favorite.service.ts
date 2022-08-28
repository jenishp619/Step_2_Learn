import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoadmapService } from './../roadmap/roadmap.service';
import { User } from './../users/entities/user.entity';
import { Favorite } from './entities/favorite.entity';

/**
 *
 * Author: Janvi Patel
 * Banner ID: B00896196
 * Email: jn398689@dal.ca
 */

@Injectable()

// service class for handling favourites
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite) private readonly favRepo: Repository<Favorite>,
    private readonly roadmapService: RoadmapService,
  ) {}

  // creating and saving favourites
  async create(id: number, user: User) {
    const roadmap = await this.roadmapService.findOne(id);
    return this.favRepo.save({ roadmapId: roadmap.id, userId: user.id });
  }

  // finding all favourites
  findAll(id: number) {
    return this.favRepo.find({
      where: { roadmapId: id },
      relations: ['roadmap', 'roadmap.user'],
    });
  }

  // finding favourite by user id
  findAllByUserId(user: User) {
    return this.favRepo.find({
      where: { userId: user.id },
      relations: ['roadmap', 'roadmap.user'],
    });
  }
  // finding favourite by user id
  findFavByUserId(id: number, user: User) {
    return this.favRepo.findOne({
      where: { userId: user.id, roadmapId: id },
      relations: ['roadmap', 'roadmap.user'],
    });
  }

  // finding favourite by roadmap id
  async findOne(id: number) {
    const fav = await this.favRepo.findOne({
      where: { roadmapId: id },
      relations: ['user', 'roadmap', 'roadmap.user'],
    });
    if (!fav || !fav.userId) {
      throw new NotFoundException('Favorite not found');
    }
    return fav;
  }

  // removing favourite
  async remove(id: number, user: User) {
    const fav = await this.findOne(id);
    if (fav.userId !== user.id) {
      throw new UnauthorizedException();
    }
    const isDeleted = await this.favRepo.delete({
      roadmapId: id,
      userId: user.id,
    });
    return !!isDeleted;
  }
}
