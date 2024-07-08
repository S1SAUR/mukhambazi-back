import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

import { Repository } from "typeorm"
import { AuthorEntity } from "./entities/author.entity"
import { CreateAuthorDto } from "./dto/create-author.dto"
import { UpdateAuthorDto } from "./dto/update-author.dto"



@Injectable()
export class AuthorRepositories {

  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  findAll() {
    return this.authorRepository
    .createQueryBuilder('author')
    .leftJoinAndSelect('author.musics','m')
    .getMany()
  }

  findOne(id: number) {
    return this.authorRepository
    .createQueryBuilder('author')
    .leftJoinAndSelect('author.musics','m')
    .where('author.id = :id',{id})
    .getMany()
  }

  create(data: CreateAuthorDto) {
    return this.authorRepository.save(data)
  }

  async remove(id: number) {
    await this.authorRepository.softDelete(id)

    return this.authorRepository
    .createQueryBuilder('author')
    .withDeleted()
    .where('author.id = :id',{id})
    .getOne()
  }
   

  async update(id: number, data: UpdateAuthorDto) {
    
    await this.authorRepository.update(id,data)

    return this.authorRepository
    .createQueryBuilder('author')
    .where('author.id = :id',{id})
    .getOne()
  }
}