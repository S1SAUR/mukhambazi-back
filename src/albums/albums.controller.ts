import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AlbumService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { validateFile } from 'src/common/file-validation.utils';
import { getFileName } from 'src/common/file-name.utils';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/ablumCovers',
        filename: (req, image, callback) => {
          callback(null, getFileName(image));
        },
      }),
      fileFilter: validateFile
    }),
  )
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: '.(jpeg|jpg|png)' })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    image: Express.Multer.File,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumService.create(createAlbumDto, image);
  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.albumService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(+id);
  }
}
