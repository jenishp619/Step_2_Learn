import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsAuthGuard } from './../is-auth.guard';
import { AuthRequest } from './../types/AuthRequest';
import { FavoriteService } from './favorite.service';

/**
 *
 * Author: Janvi Patel
 * Banner ID: B00896196
 * Email: jn398689@dal.ca
 */

@Controller('favorite')
@ApiTags('Favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  // controller level class for handling CRUD operation of favourites
  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Post(':id')
  create(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.favoriteService.create(+id, req.user);
  }

  // create api for favourites
  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Get('/user')
  findAllByUserId(@Req() req: AuthRequest) {
    return this.favoriteService.findAllByUserId(req.user);
  }

  // create api for favourites
  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Get('/users/:id')
  findFavByUserId(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.favoriteService.findFavByUserId(+id, req.user);
  }

  // get favourites by id api
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.favoriteService.findAll(+id);
  }

  // delete favourite by id api
  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.favoriteService.remove(+id, req.user);
  }
}
