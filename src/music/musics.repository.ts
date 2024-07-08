import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { MusicEntity } from "./entities/music.entity"
import { Repository } from "typeorm"
import { CreateMusicDto } from "./dto/create-musics.dto"
import { UpdateMusicDto } from "./dto/update-musics.dto"


@Injectable()
export class MusicRepositories {

  constructor(
    @InjectRepository(MusicEntity)
    private readonly musicsRepository: Repository<MusicEntity>,
  ) {}

  findAll() {
    return this.musicsRepository
    .createQueryBuilder('music')
    .getMany()
  }

  findOne(id: number) {
    return this.musicsRepository
    .createQueryBuilder('music')
    .where('music.id = :id',{id})
    .getMany()
  }

  create(data: CreateMusicDto) {
    return this.musicsRepository.save(data)
  }

  remove(id: number) {
    return this.musicsRepository.softDelete(id)
  }
   

  async update(id: number, data: UpdateMusicDto) {
    await this.musicsRepository
    .createQueryBuilder('music')
    .update()
    .set(data)
    .where('music.id = :id',{id})

    return this.musicsRepository.findOneBy({id})
  }
}