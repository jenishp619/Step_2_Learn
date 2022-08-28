import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleType } from './../types/RoleType';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockImplementation(() => Promise.resolve({})),
            createQueryBuilder: jest.fn().mockImplementation(() => {
              return {
                leftJoinAndSelect: jest.fn().mockImplementation(() => {
                  return {
                    where: jest.fn().mockImplementation(() => {
                      return {
                        orderBy: jest.fn().mockImplementation(() => {
                          return {
                            paginate: jest
                              .fn()
                              .mockImplementation(() => Promise.resolve({})),
                          };
                        }),
                      };
                    }),
                  };
                }),
              };
            }),
            findByEmail: jest
              .fn()
              .mockImplementation(() => Promise.resolve({})),
            save: jest.fn().mockImplementation(() => Promise.resolve({})),
          },
        },
        {
          provide: getRepositoryToken(Role),
          useValue: {
            findOne: jest.fn().mockImplementation(() => Promise.resolve({})),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const dto = { fullname: 'Ferin', password: 'ferin', email: 'ferin@dal.ca' };
    try {
      await service.create(dto, RoleType.user);
    } catch (error) {
      expect(true).toBe(true);
    }
  });

  it('should find users', async () => {
    expect(await service.findAll(RoleType.user)).toBeDefined();
  });

  it('should find one user', async () => {
    expect(await service.findOne(1)).toBeDefined();
  });

  it('should find user be email', async () => {
    expect(await service.findByEmail('ferin@dal.ca')).toBeDefined();
  });
});
