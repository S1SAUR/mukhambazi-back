import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumEntity } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Injectable()
export class AlbumsRepository {
    constructor(@InjectRepository(AlbumEntity)
                private albumRepo: Repository<AlbumEntity>
    ) {}

    create(data: CreateAlbumDto) {
        const album = this.albumRepo.create(data)
        return this.albumRepo.save(data)
    }

    findAll() {
        return this.albumRepo.createQueryBuilder('album')
        .leftJoinAndSelect('album.author', 'avtori')
        .leftJoinAndSelect('avtori.musics', 'musikebi')
        .getMany()
    }

    findOne(id: number) {
        return this.albumRepo.createQueryBuilder('album')
        .andWhere('album.id = :id', {id})
        .getMany()
    }

    async update(id: number, data: UpdateAlbumDto) {
        await this.albumRepo.createQueryBuilder('album')
        .update()
        .set(data)
        .andWhere('album.id = :id', {id})
        .execute()

        return this.albumRepo.findOneBy({id})
    }

    remove(id: number) {
        return this.albumRepo.delete(id)
    }
}