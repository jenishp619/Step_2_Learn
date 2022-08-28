import { CategoryService } from './../category/category.service';
import { Category } from './../category/entities/category.entity';
import { RoadmapService } from './../roadmap/roadmap.service';
import { Roadmap } from './../roadmap/entities/roadmap.entity';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Roadmap, Category])],
  controllers: [FavoriteController],
  providers: [FavoriteService, RoadmapService, CategoryService],
})
export class FavoriteModule {}
