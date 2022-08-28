import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findOne: jest.fn((id) => {
      return new Promise((resolve) => {
        resolve({
          id,
        });
      });
    }),
    findAll: jest.fn(() => Promise.resolve({})),

    update: jest.fn(() => Promise.resolve({})),
    remove: jest.fn(() => Promise.resolve(true)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be find user', async () => {
    expect(await controller.findOne('1')).toBeDefined();
  });

  it('should get all user', async () => {
    try {
      await controller.findAll('admin');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should update user', async () => {
    expect(
      await controller.update({ fullname: 'ferin' }, {
        user: {
          id: -1,
        },
      } as any),
    ).toBeDefined();
  });

  it('should delete user', async () => {
    expect(
      await controller.remove({
        user: {
          id: -1,
        },
      } as any),
    ).toBeTruthy();
  });
});
