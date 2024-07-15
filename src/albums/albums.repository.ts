import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumEntity } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Injectable()
export class AlbumsRepository {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepo: Repository<AlbumEntity>
    ) {}

    async create(data: CreateAlbumDto): Promise<AlbumEntity> {
        const album = this.albumRepo.create(data);
        return await this.albumRepo.save(album);
    }

    async findAll() {
        return await this.albumRepo.createQueryBuilder('album')
            .leftJoinAndSelect('album.author', 'author')
            .leftJoinAndSelect('author.musics', 'musics')
            .getMany();
    }

    async findOne(id: number) {
        const album = await this.albumRepo.createQueryBuilder('album')
            .leftJoinAndSelect('album.author', 'author')
            .leftJoinAndSelect('author.musics', 'musics')
            .where('album.id = :id', { id })
            .getOne();

        return album;
    }

    async update(id: number, data: UpdateAlbumDto) {
        await this.albumRepo.update(id,data)
    
        return this.albumRepo
        .createQueryBuilder('album')
        .where('album.id = :id',{id})
        .getOne()
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
