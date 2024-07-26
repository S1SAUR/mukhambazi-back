import { Module } from '@nestjs/common';
import { AlbumService } from './albums.service';
import { AlbumController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { MusicServices } from 'src/music/musics.service';
import { MusicEntity } from 'src/music/entities/music.entity';
import { MusicRepositories } from 'src/music/musics.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, MusicEntity])],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumsRepository, MusicServices, MusicRepositories],
})
export class AlbumModule {}
