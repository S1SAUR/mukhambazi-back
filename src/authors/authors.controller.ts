import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpStatus,
  ParseFilePipeBuilder,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateAuthorDto } from './dto/update-author.dto';
import multer, { diskStorage } from 'multer';
import * as s3Service from '../common/aws-s3';
import { validateFile } from 'src/common/file-validation.utils';
import { getFileName } from 'src/common/file-name.utils';
import { S3serviceService } from 'src/s3service/s3service.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService, private readonly s3service: S3serviceService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: validateFile,
    }),
  )
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: '.(jpeg|jpg|png)' })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    image: Express.Multer.File,
    @Body() createAuthorDto: CreateAuthorDto,
  ) {
    image.originalname = getFileName(image)
    const url = await this.s3service.upload(createAuthorDto.userId ,image, "authorImgs");
    return this.authorsService.create(createAuthorDto, url);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
