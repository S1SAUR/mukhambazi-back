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
import { S3serviceService } from 'src/s3service/s3service.service';

@Controller('music')
export class MusicControllers {
  constructor(
    private readonly musicService: MusicServices,
    private readonly s3service: S3serviceService,
  ) {}

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
    const fileUrl = await this.s3service.upload(
      createMusicDto.userId,
      file,
      'songSrc',
    );
    const imageUrl = await this.s3service.upload(
      createMusicDto.userId,
      image,
      'songImage',
    );
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
