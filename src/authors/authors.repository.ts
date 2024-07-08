import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

import { Repository } from "typeorm"
import { AuthorEntity } from "./entities/author.entity"
import { CreateAuthorDto } from "./dto/create-author.dto"
import { UpdateAuthorDto } from "./dto/update-author.dto"



@Injectable()
export class AthorRepository {

  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async  findAll() {
    return this.authorRepository
    .createQueryBuilder('author')
    .leftJoinAndSelect('author.musics','m')
    .getMany()
  }

  async findOne(id: number) {
    return await this.authorRepository
    .createQueryBuilder('author')
    .leftJoinAndSelect('author.musics','m')
    .where('author.id = :id',{id})
    .getMany()
  }

  async create(data: CreateAuthorDto) {
    return await this.authorRepository.save(data)
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