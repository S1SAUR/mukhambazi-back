import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AthorRepository } from './authors.repository';
import * as s3Service from "../common/aws-s3"
import * as path from "path"

@Injectable()
export class AuthorsService {

  constructor(private readonly AutorRepository:AthorRepository){}
  private readonly s3Client = new s3Service.AWSS3Service(process.env.REGION_CODE, process.env.ACCESS_KEY, process.env.SECRET_KEY)
  async upload(image: Express.Multer.File) {
    this.s3Client.uploadObject(image.originalname, image.buffer, image.mimetype)
    const url = `https://chakrulos.s3.eu-central-1.amazonaws.com/${image.originalname}`

    return url;
  }

  async create(createAuthorDto: CreateAuthorDto, url: string) {
    return await this.AutorRepository.create(createAuthorDto, url);
  }

  async findAll() {
    return await this.AutorRepository.findAll();
  }

  async findOne(id: number) {
    return await this.AutorRepository.findOne(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.AutorRepository.update(id,updateAuthorDto);
  }

  async remove(id: number) {
    return await this.AutorRepository.remove(id);
  }
}
