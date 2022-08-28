/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { Module } from '@nestjs/common';
import { MediaUploaderController } from './media-uploader.controller';

/**
 *
 * Author: Janvi Patel
 * Banner ID: B00896196
 * Email: jn398689@dal.ca
 */
@Module({
  controllers: [MediaUploaderController],
  providers: [],
})
export class MediaUploaderModule {}
