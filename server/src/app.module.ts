/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { BlogModule } from './blog/blog.module';
import { NoteModule } from './note/note.module';
import { EventModule } from './event/event.module';
import { UserEventModule } from './user-event/user-event.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ReactionModule } from './reaction/reaction.module';
import { MediaUploaderModule } from './media-uploader/media-uploader.module';
import { SearchModule } from './search/search.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';
import * as dotenv from 'dotenv';

dotenv.config();

const options: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*/*.entity.js'],
  migrations: ['dist/migration/**/*.migration.js'],
  subscribers: ['dist/subscriber/**/*.subscriber.js'],
  ssl: {
    rejectUnauthorized: false,
  },
};

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    AuthModule,
    UsersModule,
    BlogModule,
    NoteModule,
    EventModule,
    UserEventModule,
    RoadmapModule,
    CategoryModule,
    CommentModule,
    FavoriteModule,
    ReactionModule,
    MediaUploaderModule,
    SearchModule,
    NotificationModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
