import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepositories } from './authors.repository';

@Injectable()
export class AuthorsService {

  constructor(private readonly AutorRepository:AuthorRepositories){}


  create(createAuthorDto: CreateAuthorDto) {
    return this.AutorRepository.create(createAuthorDto);
  }

  findAll() {
    return this.AutorRepository.findAll();
  }

  findOne(id: number) {
    return this.AutorRepository.findOne(id);
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.AutorRepository.update(id,updateAuthorDto);
  }

  remove(id: number) {
    return this.AutorRepository.remove(id);
  }
}
