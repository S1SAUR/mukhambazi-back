import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './albums.repository';

@Injectable()
export class AlbumService {
  constructor (private readonly albumRepo: AlbumsRepository) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepo.create(createAlbumDto)
  }

  findAll() {
    return this.albumRepo.findAll();
  }

  findOne(id: number) {
    return this.albumRepo.findOne(id);
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.albumRepo.update(id, updateAlbumDto);
  }

  remove(id: number) {
    return this.albumRepo.remove(id);
  }
}
