// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import { Reaction } from './../../reaction/entities/reaction.entity';
import { Comment } from './../../comment/entities/comment.entity';
import { Favorite } from './../../favorite/entities/favorite.entity';
import { Category } from './../../category/entities/category.entity';
import { User } from './../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Roadmap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  data: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.roadmaps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.roadmaps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.roadmap)
  comments: Comment[];

  @OneToMany(() => Favorite, (favorite) => favorite.roadmap)
  favorites: Favorite[];

  @OneToMany(() => Reaction, (reaction) => reaction.roadmap)
  reactions: Reaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
