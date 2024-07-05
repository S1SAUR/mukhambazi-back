import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import {MusicRepositories } from './musics.repository';

@Injectable()
export class MusicServices {

  constructor(private readonly musicRepository:MusicRepositories){}

  create(createMusicDto: CreateMusicDto) {
    return this.musicRepository.create(createMusicDto);
  }

  findAll() {
    return this.musicRepository.findAll();
  }

  findOne(id: number) {
    return this.musicRepository.findOne(id);
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return this.musicRepository.update(id,updateMusicDto);
  }

  remove(id: number) {
    return this.musicRepository.remove(id);
  }
}
