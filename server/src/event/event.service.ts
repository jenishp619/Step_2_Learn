/* 
* Author: Jay Kirankumar Patel
* Banner: B00906433
* E-mail: jaykiranpatel@dal.ca
*/

import { User } from './../users/entities/user.entity';
import { Event } from './entities/event.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
  ) {}

  // To create a new event
  create(createEventDto: CreateEventDto, user: User) {
    return this.eventRepo.save({ ...createEventDto, userId: user.id });
  }

  // To find all events
  findAll() {
    return this.eventRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.user', 'user')
      .orderBy('event.eventDate', 'DESC')
      .paginate();
  }

  // To find one event by its id
  async findOne(id: number) {
    const event = await this.eventRepo.findOne(id, { relations: ['user'] });
    if (!event || !event.id) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  // To delete an event by its id
  async remove(id: number, user: User) {
    const event = await this.findOne(id);
    if (event.userId === user.id) {
      const isDeleted = await this.eventRepo.delete(id);
      return !!isDeleted;
    } else {
      throw new UnauthorizedException();
    }
  }
}
