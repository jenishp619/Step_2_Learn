/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { PayloadType, serializeUser } from './auth/auth.utility';
import { User } from './users/entities/user.entity';

@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request & {
      user: User;
    };

    const authorization = request.headers.authorization || '';

    if (!authorization.trim().length) {
      throw new UnauthorizedException();
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    let decoded: PayloadType | null = null;
    try {
      decoded = verify(
        token,
        process.env.ACCESS_SECRET || 'qwertyuiop',
      ) as PayloadType;
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    const user = (await User.findOne(decoded.id, {
      select: [
        'tokenVersion',
        'id',
        'email',
        'isPaidUser',
        'firstName',
        'lastName',
        'profileUrl',
      ],
    })) as User;
    if (!user) {
      throw new NotFoundException('user not found');
    }
    console.log(user.tokenVersion, decoded.tokenVersion);
    if (user.tokenVersion !== decoded.tokenVersion) {
      throw new BadRequestException('token invalid');
    }

    request.user = serializeUser(user);
    return true;
  }
}
