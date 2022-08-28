import { instanceToPlain } from 'class-transformer';
import { sign } from 'jsonwebtoken';
import { User } from './../users/entities/user.entity';

export type PayloadType = {
  id: number;
  email: string;
  tokenVersion: number;
};

export const generateAccessToken = (user: User): string => {
  const data: PayloadType = {
    id: user.id,
    email: user.email,
    tokenVersion: user.tokenVersion,
  };

  return sign(data, process.env.ACCESS_SECRET || 'qwertyuiop', {
    expiresIn: '7d',
  });
};

export const generateRefreshToken = (user: User): string => {
  const data: PayloadType = {
    id: user.id,
    email: user.email,
    tokenVersion: user.tokenVersion,
  };

  return sign(data, process.env.REFRESH_SECRET || 'qwertyuiopasdfghjkl', {
    expiresIn: '30d',
  });
};

export const generateTokens = (
  user: User,
): { accessToken: string; refreshToken: string } => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const serializeUser = (user: User): User => {
  return <User>instanceToPlain(user);
};

export const generatePasswordResetLink = (email: string) => {
  return sign({ email }, process.env.RESET_SECRET || 'qwertyuiopasdfghjkl', {
    expiresIn: '24h',
  });
};
