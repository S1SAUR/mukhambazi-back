import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
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
    
    return {
      music,
      album
    }
  }

}
