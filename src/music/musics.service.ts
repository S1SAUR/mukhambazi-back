import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-musics.dto';
import { UpdateMusicDto } from './dto/update-musics.dto';
import { MusicRepositories } from './musics.repository';

@Injectable()
export class MusicServices {
  constructor(private readonly musicRepository: MusicRepositories) {}

  create(
    createMusicDto: CreateMusicDto,
    file: Express.Multer.File,
    image: Express.Multer.File,
  ) {
    return this.musicRepository.create(createMusicDto, file, image);
  }

  findAll() {
    return this.musicRepository.findAll();
  }

  findOne(id: number) {
    return this.musicRepository.findOne(id);
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return this.musicRepository.update(id, updateMusicDto);
  }

  remove(id: number) {
    return this.musicRepository.remove(id);
  }
}
