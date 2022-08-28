import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sgMail from 'src/config/SendGrid';
import { connectionRequestTemplate } from 'src/template/connectionRequestTemplate';
import { Repository } from 'typeorm';
import { RegisterDTO } from './../auth/dto/register.dto';
import { ConnectUserDTO } from './dto/connect-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}
  async create(createUserDto: RegisterDTO): Promise<User> {
    const isFoundEmail = await this.findByEmail(createUserDto.email);
    if (isFoundEmail) {
      throw new ConflictException('email already taken');
    }

    const entity = Object.assign(new User(), createUserDto);
    return this.usersRepo.save(entity);
  }

  findAll() {
    return this.usersRepo
      .createQueryBuilder('user')
      .orderBy('user.createdAt', 'DESC')
      .paginate();
  }

  findOne(id: number): Promise<User | undefined> {
    return this.usersRepo.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepo.findOne({
      where: { email },
      select: [
        'tokenVersion',
        'password',
        'isPaidUser',
        'email',
        'firstName',
        'lastName',
        'profileUrl',
        'id',
      ],
    });
  }

  update(updateUserDto: UpdateUserDto, user: User): Promise<User> {
    if (updateUserDto.firstName && updateUserDto.firstName.trim().length) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName && updateUserDto.lastName.trim().length) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.profileUrl && updateUserDto.profileUrl.trim().length) {
      user.profileUrl = updateUserDto.profileUrl;
    }

    return this.usersRepo.save(user);
  }

  async remove(user: User): Promise<boolean> {
    const deleted = await this.usersRepo.delete({ id: user.id });
    return !!deleted;
  }

  /**
   *
   * Author: Janvi Patel
   * Banner ID: B00896196
   * Email: jn398689@dal.ca
   */
  async connect(connectUserDto: ConnectUserDTO, user: User): Promise<string> {
    sgMail
      .send({
        to: connectUserDto.email,
        from: 'ferinpatel79@gmail.com',
        subject: 'connection request',
        html: connectionRequestTemplate(user.firstName, user.lastName, user.id),
      })
      .then(() => {
        console.log('email sent');
      })
      .catch((err) => console.log(err));
    return `Email sent to ${connectUserDto.email} `;
  }
}
