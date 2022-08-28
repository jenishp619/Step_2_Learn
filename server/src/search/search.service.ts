/* 
* Author: Jay Kirankumar Patel
* Banner: B00906433
* E-mail: jaykiranpatel@dal.ca
*/
import { User } from './../users/entities/user.entity';
import { Blog } from './../blog/entities/blog.entity';
import { Event } from './../event/entities/event.entity';
import { Roadmap } from './../roadmap/entities/roadmap.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Roadmap)
    private readonly roadmapRepo: Repository<Roadmap>,
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findAll(category?: string, search?: string, type?: string) {
    if (type && type.toLocaleLowerCase() === 'event') {
      // search events on basis of title or description or address
      return this.eventRepo
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.user', 'user')
        .where('LOWER(event.title) like :title', {
          title: `%${search ? search.toLocaleLowerCase() : ''}%`,
        })
        .orWhere('LOWER(event.description) like :desc', {
          desc: `%${search ? search.toLocaleLowerCase() : ''}%`,
        })
        .orWhere('LOWER(event.address) like :address', {
          address: `%${search ? search.toLocaleLowerCase() : ''}%`,
        })
        .paginate();
    } else if (type && type.toLocaleLowerCase() === 'blog') {
      // search blogs on basis of title or description
      return this.blogRepo
        .createQueryBuilder('blog')
        .leftJoinAndSelect('blog.user', 'user')
        .where('LOWER(blog.title) like :title', {
          title: `%${search ? search.toLocaleLowerCase() : ''}%`,
        })
        .orWhere('LOWER(blog.description) like :desc', {
          desc: `%${search ? search.toLocaleLowerCase() : ''}%`,
        })
        .paginate();
    } else if (type && type.toLocaleLowerCase() === 'user') {
      // search users on basis of firstName or lastName
      return this.userRepo
        .createQueryBuilder('user')
        .where('LOWER(user.firstName) like :firstName', {
          firstName: `%${search ? search.toLocaleLowerCase() : ''}%`,
        })
        .orWhere('LOWER(user.lastName) like :lastName', {
          lastName: `%${search ? search.toLocaleLowerCase() : ''}%`,
        })
        .paginate();
    } else {
      if (category && category.trim().length) {
        // search roadmaps on basis of title or description or category
        return this.roadmapRepo
          .createQueryBuilder('roadmap')
          .leftJoinAndSelect('roadmap.user', 'user')
          .leftJoinAndSelect('roadmap.category', 'category')
          .where('category.name = :name', { name: category })
          .orWhere('LOWER(roadmap.title) like :title', {
            title: `%${search ? search.toLocaleLowerCase() : ''}%`,
          })
          .orWhere('LOWER(roadmap.description) like :desc', {
            desc: `%${search ? search.toLocaleLowerCase() : ''}%`,
          })
          .paginate();
      } else {
        // search roadmaps on basis of title or description
        return this.roadmapRepo
          .createQueryBuilder('roadmap')
          .leftJoinAndSelect('roadmap.user', 'user')
          .where('LOWER(roadmap.title) like :title', {
            title: `%${search ? search.toLocaleLowerCase() : ''}%`,
          })
          .orWhere('LOWER(roadmap.description) like :desc', {
            desc: `%${search ? search.toLocaleLowerCase() : ''}%`,
          })
          .paginate();
      }
    }
  }
}
