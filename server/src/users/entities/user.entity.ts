import { Reaction } from './../../reaction/entities/reaction.entity';
import { hash } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from './../../blog/entities/blog.entity';
import { Comment } from './../../comment/entities/comment.entity';
import { Event } from './../../event/entities/event.entity';
import { Favorite } from './../../favorite/entities/favorite.entity';
import { Note } from './../../note/entities/note.entity';
import { Notification } from './../../notification/entities/notification.entity';
import { Roadmap } from './../../roadmap/entities/roadmap.entity';
import { UserEvent } from './../../user-event/entities/user-event.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isPaidUser: boolean;

  @Column({ unique: true })
  email: string;

  @Column({
    default: 'https://ui-avatars.com/api/?background=random&name=Ferin+Patel',
  })
  profileUrl: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Exclude()
  @Column({ default: 0, select: false })
  tokenVersion: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => UserEvent, (userEvent) => userEvent.user)
  userEvents: UserEvent[];

  @OneToMany(() => Roadmap, (roadmap) => roadmap.user)
  roadmaps: Roadmap[];

  @OneToMany(() => Reaction, (reaction) => reaction.user)
  reactions: Reaction[];

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 12);
  }
}
