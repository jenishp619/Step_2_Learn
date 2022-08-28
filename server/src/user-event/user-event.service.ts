/* 
* Author: Jay Kirankumar Patel
* Banner: B00906433
* E-mail: jaykiranpatel@dal.ca
*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventService } from 'src/event/event.service';
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';
import { Repository } from 'typeorm';
import { User } from './../users/entities/user.entity';
import { CreateUserEventDto } from './dto/create-user-event.dto';
import { UserEvent } from './entities/user-event.entity';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class UserEventService {
  constructor( 
    @InjectRepository(UserEvent)
    private readonly userEventRepo: Repository<UserEvent>,
    private readonly eventService: EventService,
    private readonly notificationService: NotificationService,
  ) {}
  async create(createUserEventDto: CreateUserEventDto,createNotificationDto:CreateNotificationDto, user: User) {
    const event = await this.eventService.findOne(createUserEventDto.eventId);
    var userEvent =  this.userEventRepo.save({ eventId: event.id, userId: user.id });
    createNotificationDto.content= `you registered for an event : ${event.title}` 
    createNotificationDto.type= "event"
    var notification = await this.notificationService.create(createNotificationDto,user)
    return userEvent
  }

  // To get all the users registered for an event
  findAllByEventId(id: number) {
    return this.userEventRepo
      .createQueryBuilder('userEvent')
      .leftJoinAndSelect('userEvent.user', 'user')
      .leftJoinAndSelect('userEvent.event', 'event')
      .where('userEvent.eventId = :id', { id })
      .orderBy('event.eventDate', 'DESC')
      .paginate();
  }

  // To get all registered events for a user
  findAllByUserId(id: number) {
    return this.userEventRepo
      .createQueryBuilder('userEvent')
      .leftJoinAndSelect('userEvent.user', 'user')
      .leftJoinAndSelect('userEvent.event', 'event')
      .where('userEvent.userId = :id', { id })
      .orderBy('event.eventDate', 'DESC')
      .paginate();
  }

  // To unresgister user from an event
  async remove(id: number, user: User) {
    const isDeleted = await this.userEventRepo.delete({
      eventId: id,
      userId: user.id,
    });
    return !!isDeleted;
  }
}
