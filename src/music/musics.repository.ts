import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Music } from "./entities/music.entity"
import { Repository } from "typeorm"
import { CreateMusicDto } from "./dto/create-music.dto"
import { UpdateMusicDto } from "./dto/update-music.dto"


@Injectable()
export class MusicRepositories {
  constructor(
    @InjectRepository(Music)
    private readonly musicsRepository: Repository<Music>,
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
    return this.musicsRepository.remove(id)
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