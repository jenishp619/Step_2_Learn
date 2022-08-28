// Author: Krutarth Patel
// Banner ID: B00896235
// * Email: kr653484@dal.ca

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.save({ ...createCategoryDto });
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async findOneById(id: number) {
    const category = await this.categoryRepo.findOne(id);
    if (!category || !category.id) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async remove(id: number) {
    const isDeleted = await this.categoryRepo.delete(id);
    return !!isDeleted;
  }
}
