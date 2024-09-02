import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository ){}

  async create(createFavoriteDto: CreateFavoriteDto) {
    return await this.favoritesRepository.create(createFavoriteDto);
  }

  async findAll() {
    return await this.favoritesRepository.findAll()
  }

  async findOne(id: number) {
    return await this.favoritesRepository.findOneUserAllFavorite(id)
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return await this.favoritesRepository.update(id, updateFavoriteDto)
  }

  async remove(id: number) {
    return await this.favoritesRepository.remove(id)
  }
}
