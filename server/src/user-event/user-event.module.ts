/* 
* Author: Jay Kirankumar Patel
* Banner: B00906433
* E-mail: jaykiranpatel@dal.ca
*/
import { EventService } from './../event/event.service';
import { Event } from './../event/entities/event.entity';
import { UserEvent } from './entities/user-event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserEventService } from './user-event.service';
import { UserEventController } from './user-event.controller';
import { NotificationService } from 'src/notification/notification.service';
import { Notification } from 'src/notification/entities/notification.entity';
import { NotificationController } from 'src/notification/notification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEvent, Event,Notification])],
  controllers: [UserEventController],
  providers: [UserEventService, EventService,NotificationService],
})
export class UserEventModule {}
