import { Injectable } from '@nestjs/common';
import { MusicRepositories } from 'src/music/musics.repository';
import { AlbumsRepository } from 'src/albums/albums.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly musicRepository: MusicRepositories,

    private readonly albumRepository: AlbumsRepository
  ){}

  async search(search: string) {
    let music = await this.musicRepository.search(search)
    let album = await this.albumRepository.search(search)
    
  
    let musicAndAlbum = [music,album]
    let newarr = []
  
    for(let i = 0;i < musicAndAlbum.length;i++){
      if(musicAndAlbum[i].length != 0){
        newarr.push(musicAndAlbum[i])
      }
    }
    if(newarr.length === 0)return `${search} not found`
    return newarr
  }

}
