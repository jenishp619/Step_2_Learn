/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { PartialType } from '@nestjs/swagger';
import { CreateReactionDto } from './create-reaction.dto';

export class UpdateReactionDto extends PartialType(CreateReactionDto) {}
