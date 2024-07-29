import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumEntity } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { MusicEntity } from "src/music/entities/music.entity";
import { MusicServices } from "src/music/musics.service";
import { MusicRepositories } from "src/music/musics.repository";
import { profileEnd } from "console";

@Injectable()
export class AlbumsRepository {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepo: Repository<AlbumEntity>,
    ) {}

    async create(data: CreateAlbumDto): Promise<AlbumEntity> {
        const album = this.albumRepo.create(data)
        album.musics = [];

        for(let i = 0; i < data.musicsIds.length; i++) {
            const music = new MusicEntity()
            music.id = data.musicsIds[i]
            album.musics.push(music)
        }

        return this.albumRepo.save(album);
    }

    async findAll() {
        return await this.albumRepo.createQueryBuilder('album')
            .leftJoinAndSelect('album.musics', 'musics')
            .getMany();
    }

    async findOne(id: number) {
        const album = await this.albumRepo.createQueryBuilder('album')
            .where('album.id = :id', {id})
            .leftJoinAndSelect('album.musics', 'musics')
            .getOne();

            return album
    }

    async update(id: number, data: UpdateAlbumDto) {
        const {musicsIds, ...res} = data;
        
        const album = new AlbumEntity();
        album.id = id;
        Object.assign(album, res);
        album.musics = this.convertMusics(musicsIds);

        return this.albumRepo.save(album)
    }

    convertMusics(musicsIds: number[]): MusicEntity[] {
        const musics = [];
        for (let item of musicsIds) {
            const music = new MusicEntity()
            music.id = item;
            musics.push(music)
        }

        return musics
    }

    async remove(id: number) {
        await this.albumRepo.softDelete(id)
    
        return this.albumRepo
        .createQueryBuilder('album')
        .withDeleted()
        .where('album.id = :id',{id})
        .getOne()
      }
    
    async search(search:string){
        return await this.albumRepo
        .createQueryBuilder('album')
        .leftJoinAndSelect('album.author', 'author')
        .leftJoinAndSelect('author.musics', 'musics')
        .where('album.name LIKE :search',{search: `${search}%`})
        .getMany()
    }
    
}
