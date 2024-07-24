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
    return `This action returns all playlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
