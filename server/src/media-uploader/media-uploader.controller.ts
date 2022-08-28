/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import {
  BadRequestException,
  Controller,
  Post,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import cloudinary from 'cloudinary';
import fs from 'fs';
import { diskStorage } from 'multer';
import path from 'path';
import cloudinaryUploader from '../config/Cloudinary';

/**
 *
 * Author: Janvi Patel
 * Banner ID: B00896196
 * Email: jn398689@dal.ca
 */
const storage = () =>
  diskStorage({
    destination: (_req, _file, cb) =>
      cb(null, path.join(__dirname, '../uploads')),
    filename: (_req, file, cb) => {
      return cb(null, `${Date.now()}.jpg`);
    },
  });

@Controller('media-uploader')
@ApiTags('Media Uploads')
export class MediaUploaderController {
  @Post('upload/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage(),
      fileFilter: (_req, file, cb) => {
        if (file.mimetype.includes('image')) {
          cb(null, true);
        } else {
          cb(new UnsupportedMediaTypeException('invalid file type'), false);
        }
      },
    }),
  )
  async uploadImageFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<cloudinary.UploadApiResponse> {
    if (!file) {
      throw new BadRequestException();
    }
    const UploadedData = await cloudinaryUploader.v2.uploader.upload(
      file.path,
      {
        upload_preset: 'web-18',
      },
    );

    fs.unlinkSync(file.path);
    return UploadedData;
  }
}
