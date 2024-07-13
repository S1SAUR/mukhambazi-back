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

     let music = await this.musicRepository
    .createQueryBuilder('music')
    .where('music.name LIKE :search',{search: `${search.search}%`})
    .getMany()

    let album = await this.albumRepository
    .createQueryBuilder('album')
    .leftJoinAndSelect('album.author', 'author')
    .leftJoinAndSelect('author.musics', 'musics')
    .where('album.name LIKE :search',{search: `${search.search}%`})
    .getMany()


   let musicAndAlbum = [music,album]
   let newarr = []

    for(let i = 0;i < musicAndAlbum.length;i++){
      if(musicAndAlbum[i].length != 0){
        newarr.push(musicAndAlbum[i])
      }
    }
    
    return newarr
  }
}
