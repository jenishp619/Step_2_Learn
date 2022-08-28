// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import { Roadmap } from './../../roadmap/entities/roadmap.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: 'https://source.unsplash.com/random' })
  imageUrl: string;

  @OneToMany(() => Roadmap, (roadmap) => roadmap.category)
  roadmaps: Roadmap[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
