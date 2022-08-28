import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

/**
 *
 * Author: Janvi Patel
 * Banner ID: B00896196
 * Email: jn398689@dal.ca
 */
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}
