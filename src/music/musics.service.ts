import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-musics.dto';
import { UpdateMusicDto } from './dto/update-musics.dto';
import { MusicRepositories } from './musics.repository';
import * as s3Service from '../common/aws-s3';

@Injectable()
export class MusicServices {
  constructor(private readonly musicRepository: MusicRepositories) {}
  private readonly s3Client = new s3Service.AWSS3Service(
    process.env.REGION_CODE,
    process.env.ACCESS_KEY,
    process.env.SECRET_KEY,
  );
  async upload(file: Express.Multer.File) {
    this.s3Client.uploadObject(
      `${file.mimetype === 'audio/mpeg' ? 'songSrc' : 'songImage'}/${file.originalname}`,
      file.buffer,
      file.mimetype,
    );
    const url = `https://chakrulos.s3.eu-central-1.amazonaws.com/${file.mimetype === 'audio/mpeg' ? 'songSrc' : 'songImage'}/${file.originalname}`;

    return url;
  }

  create(
    createMusicDto: CreateMusicDto,
    fileUrl: string,
    imageUrl: string,
  ) {
    return this.musicRepository.create(createMusicDto, fileUrl, imageUrl);
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
