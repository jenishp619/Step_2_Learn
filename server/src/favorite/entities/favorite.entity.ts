import { Roadmap } from './../../roadmap/entities/roadmap.entity';
import { User } from './../../users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

/**
    * 
    * Author: Janvi Patel
    * Banner ID: B00896196
    * Email: jn398689@dal.ca
*/
@Entity()
// entity class for favourite
export class Favorite {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  roadmapId: number;

  @ManyToOne(() => User, (user) => user.favorites, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Roadmap, (roadmap) => roadmap.favorites, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roadmapId' })
  roadmap: Roadmap;

  @CreateDateColumn()
  createdAt: Date;
}
