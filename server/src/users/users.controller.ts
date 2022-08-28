import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import sgMail from 'src/config/SendGrid';
import { PaginatedResponse } from 'src/types/PaginatedResponse';
import { serializeUser } from './../auth/auth.utility';
import { IsAuthGuard } from './../is-auth.guard';
import { AuthRequest } from './../types/AuthRequest';
import { ConnectUserDTO } from './dto/connect-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return serializeUser(user);
  }



  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Post("/connect")
  create(
    @Body() connectUserDto: ConnectUserDTO,
    @Req() req: AuthRequest,
  ) {
   
    return this.usersService.connect(connectUserDto, req.user);
  }

  @Get('')
  async findAll(): Promise<PaginatedResponse> {
    const users = await this.usersService.findAll();
    users.data = users.data.map((item: User) => serializeUser(item));
    return users;
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @SetMetadata('auth', [])
  @Patch()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: AuthRequest,
  ): Promise<User> {
    if (!req.user) {
      throw new BadRequestException();
    }
    return this.usersService.update(updateUserDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @SetMetadata('auth', [])
  @Delete()
  remove(@Req() req: AuthRequest): Promise<boolean> {
    if (!req.user) {
      throw new BadRequestException();
    }
    return this.usersService.remove(req.user);
  }
}
