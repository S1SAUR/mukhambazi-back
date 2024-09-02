import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoritesRepository } from './favorites.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FavoritesService {

  constructor(private readonly favoriteRepository: FavoritesRepository,private readonly jwtService: JwtService){}
  async create(createFavoriteDto: CreateFavoriteDto) {
    return await this.favoriteRepository.create(createFavoriteDto)
  }

  async findAll() {
    return await this.favoriteRepository.findAll()
  }

  async findOne(request){
    try{
      let cookie = request.cookies['jwt']

      let data = await this.jwtService.verifyAsync(cookie)

      if(!data){
        throw new UnauthorizedException()
      }

      let user = this.favoriteRepository.findOneUserAllFavorite(data.id)
       return user
    } catch(err){
      throw new UnauthorizedException()
   }
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return await this.favoriteRepository.update(id, updateFavoriteDto)
  }

  async remove(id: number) {
    return await this.favoriteRepository.remove(id)
  }
}
