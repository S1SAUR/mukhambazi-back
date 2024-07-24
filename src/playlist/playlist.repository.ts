import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Column, PrimaryGeneratedColumn, Repository } from "typeorm";
import { PlaylistEntity } from "./entities/playlist.entity";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { MusicEntity } from "src/music/entities/music.entity";

@Injectable()
export class PlayListRepository {

    constructor(
        @InjectRepository(PlaylistEntity)
        private readonly usersRepository: Repository<PlaylistEntity>,
      ) {}
    
      async findAll(){
        return await this.usersRepository
        .createQueryBuilder('playList')
        .getMany()
      }
    
      async findOne(id: number) {
        return await this.usersRepository
        .createQueryBuilder('playList')
        .where('playList.id = :id',{id})
        .getOne()
      }
    
      async create(data: CreatePlaylistDto) {

        let playlist = this.usersRepository.create(data)
        playlist.musics = []

        for(let i = 0;i < data.musicIds.length;i++){
            let music = new MusicEntity()
            music.id = data.musicIds[i]
            playlist.musics.push(music)
        }
        console.log(playlist);
        

        return this.usersRepository.save(playlist)
        
      }
    
      async update(id: number, data: UpdatePlaylistDto) {
        
        await this.usersRepository.update(id,data)
    
        return this.usersRepository
        .createQueryBuilder('playList')
        .where('playList.id = :id',{id})
        .getOne()
      }
    
      async remove(id: number) {
        await this.usersRepository.softDelete(id)
    
        return this.usersRepository
        .createQueryBuilder('playList')
        .withDeleted()
        .where('playList.id = :id',{id})
        .getOne()
      }
}