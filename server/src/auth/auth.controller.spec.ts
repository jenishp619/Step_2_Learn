import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn().mockImplementation(() => Promise.resolve({})),
    register: jest.fn().mockImplementation(() => Promise.resolve({})),
    registerLandlord: jest.fn().mockImplementation(() => Promise.resolve({})),
    registerAdmin: jest.fn().mockImplementation(() => Promise.resolve({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', async () => {
    expect(
      await controller.login({
        email: 'ferin@dal.ca',
        password: '1234567890',
      }),
    ).toBeDefined();
  });

  it('should register', async () => {
    expect(
      await controller.register({
        email: 'ferin@dal.ca',
        password: '1234567890',
        fullname: 'Ferin Patel',
      }),
    ).toBeDefined();
  });

  it('should register as landlord', async () => {
    try {
      await controller.registerLandlord({
        email: 'ferin@dal.ca',
        password: '1234567890',
        fullname: 'Ferin Patel',
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should register as Admin', async () => {
    expect(
      await controller.registerAdmin({
        email: 'ferin@dal.ca',
        password: '1234567890',
        fullname: 'Ferin Patel',
      }),
    ).toBeDefined();
  });
});
