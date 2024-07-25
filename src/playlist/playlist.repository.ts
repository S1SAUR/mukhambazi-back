import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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

      attach(musicIds: number[]): MusicEntity[]{
        let arr = [] 
        for(let i = 0;i < musicIds.length;i++){
          let music = new MusicEntity()
          music.id = musicIds[i]
          arr.push(music)
        }
        return arr
      }

      findOneUsersAllPlayList(id: number){
        return  this.usersRepository
        .createQueryBuilder('playList')
        .leftJoin('playList.user','user')
        .leftJoinAndSelect('playList.musics','musics')
        .where('user.id = :id',{id})
        .getMany()
      }
    
      async findAll(){
        return await this.usersRepository
        .createQueryBuilder('playList')
        .leftJoinAndSelect('playList.musics','musics')
        .getMany()
      }
    
      async findOne(id: number) {
        return await this.usersRepository
        .createQueryBuilder('playList')
        .leftJoinAndSelect('playList.musics','musics')
        .where('playList.id = :id',{id})
        .getOne()
      }
    
      async create(data: CreatePlaylistDto) {
        let playlist = this.usersRepository.create(data)
        playlist.musics = this.attach(data.musicIds)

        return this.usersRepository.save(playlist)
        
      }
    
      async update(id: number, data: UpdatePlaylistDto) {
        console.log(data);
        
        
        let {musicIds,...Column} = data

        let playList = new PlaylistEntity()
        playList.id = id
        Object.assign(playList,Column)
        if(musicIds){
          playList.musics = this.attach(musicIds)
        }
        
        return this.usersRepository.save(playList)
        
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