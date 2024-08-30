import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AthorRepository } from './authors.repository';
import * as s3Service from "../common/aws-s3"
import * as path from "path"

@Injectable()
export class AuthorsService {

  constructor(private readonly AutorRepository:AthorRepository){}

  async create(createAuthorDto: CreateAuthorDto, image: Express.Multer.File) {
    const s3Client = new s3Service.AWSS3Service('eu-central-1', process.env.ACCESS_KEY, process.env.SECRET_KEY)
    s3Client.createS3Bucket()
    s3Client.deleteObject("uploads/images.jpg")
    return await this.AutorRepository.create(createAuthorDto, image);
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
