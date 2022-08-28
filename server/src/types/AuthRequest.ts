/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { Request } from 'express';
import { User } from './../users/entities/user.entity';

export type AuthRequest = Request & {
  user?: User;
};
