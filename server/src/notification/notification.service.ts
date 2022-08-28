import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../users/entities/user.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';

/**
 *
 * Author: Janvi Patel
 * Banner ID: B00896196
 * Email: jn398689@dal.ca
 */

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}
  create(createNotificationDto: CreateNotificationDto, user: User) {
    return this.notificationRepo.save({
      ...createNotificationDto,
      userId: user.id,
    });
  }

  // fetching the notification
  findAll(user: User) {
    return this.notificationRepo.find({
      where: { userId: user.id },
      relations: ['user'],
    });
  }

  // deleting the notification
  async remove(id: string, user: User) {
    const _id = parseInt(id);
    await this.notificationRepo.delete({ id: _id, userId: user.id });
    return true;
  }
}
