import {
  Body,
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
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';

/**
 *
 * Author: Janvi Patel
 * Banner ID: B00896196
 * Email: jn398689@dal.ca
 */
@Controller('notification')
@ApiTags('Notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Post()
  create(
    @Body() createNotification: CreateNotificationDto,
    @Req() req: AuthRequest,
  ) {
    return this.notificationService.create(createNotification, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.notificationService.findAll(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Delete(':ids')
  remove(@Param('ids') ids: string, @Req() req: AuthRequest) {
    return this.notificationService.remove(ids, req.user);
  }
}
