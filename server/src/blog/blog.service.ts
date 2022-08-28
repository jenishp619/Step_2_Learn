// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import { User } from './../users/entities/user.entity';
import { Blog } from './entities/blog.entity';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
  ) {}

  create(createBlogDto: CreateBlogDto, user: User) {
    return this.blogRepo.save({ ...createBlogDto, userId: user.id });
  }

  findAll() {
    return this.blogRepo
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .orderBy('blog.createdAt')
      .paginate();
  }

  async findOne(id: number) {
    const blog = await this.blogRepo.findOne(id, { relations: ['user'] });
    if (!blog || !blog.id) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async remove(id: number, user: User) {
    const blog = await this.findOne(id);
    if (blog.user.id === user.id) {
      const isDeleted = await this.blogRepo.delete(id);
      return !!isDeleted;
    } else {
      throw new UnauthorizedException();
    }
  }
}
