import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async findAll() {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.musics', 'm')
      .leftJoinAndSelect('author.album', 'a')
      .getMany();
  }

  async findOne(id: number) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.musics', 'm')
      .leftJoinAndSelect('author.album', 'a')
      .where('author.id = :id', { id })
      .getOne();
  }

  async create(data: CreateAuthorDto, url: string) {
    const author = new AuthorEntity();
    author.biography = data.biography;
    author.country = data.country;
    author.firstName = data.firstName;
    author.lastName = data.lastName;
   
    author.image = url;

    return await this.authorRepository.save(author);
  }

  async update(id: number, data: UpdateAuthorDto) {
    await this.authorRepository.update(id, data);

    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.id = :id', { id })
      .getOne();
  }

  async remove(id: number) {
    await this.authorRepository.softDelete(id);

    return await this.authorRepository
      .createQueryBuilder('author')
      .withDeleted()
      .where('author.id = :id', { id })
      .getOne();
  }
  async search(search: string) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.musics', 'm')
      .where('author.firstName OR author.firstName LIKE :search', { search: `${search}%` })
      .getMany();
  }
}
