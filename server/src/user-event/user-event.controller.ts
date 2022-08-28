/* 
* Author: Jay Kirankumar Patel
* Banner: B00906433
* E-mail: jaykiranpatel@dal.ca
*/
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
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';
import { IsAuthGuard } from './../is-auth.guard';
import { AuthRequest } from './../types/AuthRequest';
import { CreateUserEventDto } from './dto/create-user-event.dto';
import { UserEventService } from './user-event.service';

@Controller('user-event')
@ApiTags('User Event Registration')
export class UserEventController {
  constructor(private readonly userEventService: UserEventService) {}

  // To register a user for an event
  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Post()
  create(
    @Body() createUserEventDto: CreateUserEventDto,
    @Req() req: AuthRequest,
  ) {
    var ctdo = new CreateNotificationDto()    
    return this.userEventService.create(createUserEventDto,ctdo, req.user);
  }

  // To get all the users registered for an event
  @Get('/event/:id')
  findByEventId(@Param('id') id: string) {
    return this.userEventService.findAllByEventId(+id);
  }

  // To get all registered events for a user
  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.userEventService.findAllByUserId(+id);
  }

  // To unregister a user from an event
  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.userEventService.remove(+id, req.user);
  }
}
