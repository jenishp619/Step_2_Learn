import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { PayloadType } from './auth.utility';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ResetDTO } from './dto/reset.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    let user: User | undefined = undefined;

    user = await this.usersService.findByEmail(loginDTO.email);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    const isValid = await compare(loginDTO.password, user.password);

    if (!isValid) {
      throw new BadRequestException('Incorrect Password');
    }
    return user;
  }

  async register(registerDTO: RegisterDTO): Promise<User> {
    const user = await this.usersService.create(registerDTO);
    return user;
  }

  async resetPassword(resetDTO: ResetDTO) {
    const isTokenValid = jwt.verify(
      resetDTO.token,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.RESET_SECRET!,
    ) as { email: string };
    if (!isTokenValid) {
      throw new BadRequestException('jwt malformed');
    }
    const user = await this.usersService.findByEmail(isTokenValid.email);
    user.password = await hash(resetDTO.password, 12);
    user.tokenVersion = user.tokenVersion + 1;
    this.usersRepo.save(user);
    return true;
  }

  async accessTokenVerify(data: {
    access_token: string;
  }): Promise<User | undefined> {
    const isTokenValid = jwt.verify(
      data.access_token,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.ACCESS_SECRET!,
    ) as PayloadType;
    if (!isTokenValid) {
      throw new BadRequestException('jwt malformed');
    }
    return this.usersService.findOne(isTokenValid.id);
  }
}
