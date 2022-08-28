/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { User } from './../../users/entities/user.entity';
import { Roadmap } from './../../roadmap/entities/roadmap.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Reaction {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  roadmapId: number;

  @ManyToOne(() => User, (user) => user.reactions, { primary: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.reactions, { primary: true })
  @JoinColumn({ name: 'roadmapId' })
  roadmap: Roadmap;

  @Column({ default: '🤟' })
  emoji: string;

  @CreateDateColumn()
  createdAt: Date;
}
