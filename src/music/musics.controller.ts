import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFiles,
  HttpException,
} from '@nestjs/common';
import * as fs from 'fs';
import { MusicServices } from './musics.service';
import { CreateMusicDto } from './dto/create-musics.dto';
import { UpdateMusicDto } from './dto/update-musics.dto';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { validateFile } from 'src/common/file-validation.utils';
import { getFileName } from 'src/common/file-name.utils';

@Controller('music')
export class MusicControllers {
  constructor(private readonly musicService: MusicServices) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      fileFilter: validateFile,
    }),
  )
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createMusicDto: CreateMusicDto,
  ) {
    const image = files.find((file) => file.fieldname === 'image');
    const file = files.find((file) => file.fieldname === 'file');
    const fileUrl = await this.musicService.upload(file)
    const imageUrl = await this.musicService.upload(image)
    return this.musicService.create(createMusicDto, fileUrl, imageUrl);
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(+id, updateMusicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(+id);
  }
}
