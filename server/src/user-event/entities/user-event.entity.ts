/* 
* Author: Jay Kirankumar Patel
* Banner: B00906433
* E-mail: jaykiranpatel@dal.ca
*/
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Event } from './../../event/entities/event.entity';
import { User } from './../../users/entities/user.entity';

@Entity()
export class UserEvent {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  eventId: number;

  @ManyToOne(() => User, (user) => user.userEvents, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Event, (event) => event.userEvents, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'eventId' })
  event: Event;
}
