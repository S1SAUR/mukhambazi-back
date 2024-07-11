import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { MusicEntity } from "src/music/entities/music.entity"
import { Repository } from "typeorm"
import { AlbumEntity } from "src/albums/entities/album.entity"


@Injectable()
export class SearchRepository {

  constructor(
    @InjectRepository(MusicEntity)
      private readonly musicRepository: Repository<MusicEntity>,

    @InjectRepository(AlbumEntity)
      private readonly albumRepository: Repository<AlbumEntity>
  ) {}

  async search(search: string) {

     const music = this.musicRepository
    .createQueryBuilder('music')
    .where('music.name LIKE :search',{search: `${search.search}%`})
    .getMany()

    const album =  this.albumRepository
    .createQueryBuilder('album')
    .leftJoinAndSelect('album.author', 'author')
    .leftJoinAndSelect('author.musics', 'musics')
    .where('album.title LIKE :search',{search: `${search.search}%`})
    .getMany()

    return Promise.all([music,album]).then((resault) => {
        return [...resault]
    })
  } 
}