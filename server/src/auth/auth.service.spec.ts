import { Role } from './../users/entities/role.entity';
import { UsersService } from './../users/users.service';
import { User } from './../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockAuthRepo = {
    login: jest.fn().mockImplementation(() => Promise.resolve({})),
    register: jest.fn().mockImplementation(() => Promise.resolve({})),
    registerAdmin: jest.fn().mockImplementation(() => Promise.resolve({})),
    registerLanlord: jest.fn().mockImplementation(() => Promise.resolve({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockAuthRepo,
        },
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest
              .fn()
              .mockImplementation(() => Promise.resolve({})),
            create: jest.fn().mockImplementation(() => Promise.resolve({})),
          },
        },
        {
          provide: getRepositoryToken(Role),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login', async () => {
    try {
      await service.login({
        email: 'ferinpatel79@gmail.com',
        password: '1234567890',
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should register', async () => {
    expect(
      await service.register({
        email: 'ferinpatel79@gmail.com',
        password: '1234567890',
        fullname: 'Ferin Patel',
      }),
    ).toBeDefined();
  });

  it('should register by admin', async () => {
    expect(
      await service.registerAdmin({
        email: 'ferinpatel79@gmail.com',
        password: '1234567890',
        fullname: 'Ferin Patel',
      }),
    ).toBeDefined();
  });

  it('should register by landlord', async () => {
    expect(
      await service.registerLanlord({
        email: 'ferinpatel79@gmail.com',
        password: '1234567890',
        fullname: 'Ferin Patel',
      }),
    ).toBeDefined();
  });
});
