/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

import { Test, TestingModule } from '@nestjs/testing';
import { MediaUploaderController } from './media-uploader.controller';
import { MediaUploaderService } from './media-uploader.service';

describe('MediaUploaderController', () => {
  let controller: MediaUploaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaUploaderController],
      providers: [MediaUploaderService],
    }).compile();

    controller = module.get<MediaUploaderController>(MediaUploaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
