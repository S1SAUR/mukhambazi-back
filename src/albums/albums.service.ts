import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './albums.repository';
import * as s3Service from '../common/aws-s3';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepo: AlbumsRepository) {}

  private readonly s3Client = new s3Service.AWSS3Service(
    process.env.REGION_CODE,
    process.env.ACCESS_KEY,
    process.env.SECRET_KEY,
  );

  async upload(image: Express.Multer.File) {
    this.s3Client.uploadObject(
      `albumImgs/${image.originalname}`,
      image.buffer,
      image.mimetype,
    );
    const url = `https://chakrulos.s3.eu-central-1.amazonaws.com/albumImgs/${image.originalname}`;

    return url;
  }

  async create(createAlbumDto: CreateAlbumDto, url: string) {
    return await this.albumRepo.create(createAlbumDto, url);
  }

  async findAll() {
    return await this.albumRepo.findAll();
  }

  async findOne(id: number) {
    return await this.albumRepo.findOne(id);
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepo.update(id, updateAlbumDto);
  }

  async remove(id: number) {
    return await this.albumRepo.remove(id);
  }
}
