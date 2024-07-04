import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Music } from "./entities/music.entity"
import { Repository } from "typeorm"
import { CreateMusicDto } from "./dto/create-music.dto"
import { UpdateMusicDto } from "./dto/update-music.dto"


@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(Music)
    private readonly repositori: Repository<Music>,
  ) {}

  findAll() {
    return this.repositori
    .createQueryBuilder('music')
    .getMany()
  }

  findOne(id: number) {
    return this.repositori
    .createQueryBuilder('music')
    .where('music.id = :id',{id})
    .getMany()
  }

  create(data: CreateMusicDto) {
    return this.repositori.save(data)
  }

  async remove(id: number) {}
   

  async update(id: number, data: UpdateMusicDto) {
    await this.repositori
    .createQueryBuilder('music')
    .update()
    .set(data)
    .where('music.id = :id',{id})

    return this.repositori.findOneBy({id})
  }
}