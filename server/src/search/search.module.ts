/* 
* Author: Jay Kirankumar Patel
* Banner: B00906433
* E-mail: jaykiranpatel@dal.ca
*/
import { User } from './../users/entities/user.entity';
import { Blog } from './../blog/entities/blog.entity';
import { Event } from './../event/entities/event.entity';
import { Roadmap } from './../roadmap/entities/roadmap.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Roadmap, Event, Blog, User])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
