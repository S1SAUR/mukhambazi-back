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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { validateFile } from 'src/common/file-validation.utils';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/authorImgs',
        filename: (req, image, callback) => {
          const fileExt = extname(image.originalname).toLowerCase();
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${image.originalname.split('.')[0]}-${uniqueSuffix}${fileExt}`;
          callback(null, filename);
        },
      }),
      fileFilter: validateFile
    }),
  )
  create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/jpeg' })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    image: Express.Multer.File,
    @Body() createAuthorDto: CreateAuthorDto,
  ) {
    return this.authorsService.create(createAuthorDto, image);
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
