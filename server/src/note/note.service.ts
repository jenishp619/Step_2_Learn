import { Note } from './entities/note.entity';
import { User } from './../users/entities/user.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepo: Repository<Note>,
  ) {}

  create(createNoteDto: CreateNoteDto, user: User) {
    return this.noteRepo.save({ ...createNoteDto, userId: user.id });
  }

  findAll(user: User) {
    return this.noteRepo
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.user', 'user')
      .where('note.userId = :userId', { userId: user.id })
      .orderBy('note.createdAt', 'DESC')
      .paginate();
  }

  async findOne(id: number, user: User) {
    const note = await this.noteRepo.findOne(
      { id, userId: user.id },
      { relations: ['user'] },
    );
    if (!note || !note.id) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, user: User) {
    const note = await this.findOne(id, user);

    if (note.userId !== user.id) {
      throw new UnauthorizedException();
    }

    if (updateNoteDto.title && updateNoteDto.title.trim().length) {
      note.title = updateNoteDto.title;
    }
    if (updateNoteDto.description && updateNoteDto.description.trim().length) {
      note.description = updateNoteDto.description;
    }

    return this.noteRepo.save(note);
  }

  async remove(id: number, user: User) {
    const note = await this.findOne(id, user);
    if (note.userId === user.id) {
      return this.noteRepo.delete(id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
