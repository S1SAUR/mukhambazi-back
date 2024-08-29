import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AthorRepository } from './authors.repository';

@Injectable()
export class AuthorsService {

  constructor(private readonly AutorRepository:AthorRepository){}


  async create(createAuthorDto: CreateAuthorDto, image: Express.Multer.File) {
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
