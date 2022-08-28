import { AuthRequest } from './../types/AuthRequest';
import { IsAuthGuard } from './../is-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('note')
@ApiTags('Note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Req() req: AuthRequest) {
    return this.noteService.create(createNoteDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.noteService.findAll(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.noteService.findOne(+id, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req: AuthRequest,
  ) {
    return this.noteService.update(+id, updateNoteDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(IsAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.noteService.remove(+id, req.user);
  }
}
