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

@Controller('music')
export class MusicControllers {
  constructor(private readonly musicService: MusicServices) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: (req, file, callback) => {
          const destinationPath =
            file.fieldname === 'image'
              ? './uploads/songCovers'
              : './uploads/mp3Src';
          fs.mkdirSync(destinationPath, { recursive: true });
          callback(null, destinationPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: validateFile,
    }),
  )
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createMusicDto: CreateMusicDto,
  ) {
    const image = files.find((file) => file.fieldname === 'image');
    const file = files.find((file) => file.fieldname === 'file');
    return this.musicService.create(createMusicDto, file, image);
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
