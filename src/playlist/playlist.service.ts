import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlayListRepository } from './playlist.repository';

@Injectable()
export class PlaylistService {

  constructor( private readonly playListRepository: PlayListRepository){}

  create(createPlaylistDto: CreatePlaylistDto) {
    return this.playListRepository.create(createPlaylistDto);
  }

  findAll() {
    return this.playListRepository.findAll();
  }

  findOne(id: number) {
    return this.playListRepository.findOne(id)
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return this.playListRepository.update(id,updatePlaylistDto)
  }

  remove(id: number) {
    return this.playListRepository.remove(id)
  }

  findOneUsersAllPlayList(id: number){
    return this.playListRepository.findOneUsersAllPlayList(id)
  }
}
