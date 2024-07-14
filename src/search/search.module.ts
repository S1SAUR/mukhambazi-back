import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MusicRepositories } from 'src/music/musics.repository';
import { MusicModule } from 'src/music/musics.module';
import { MusicEntity } from 'src/music/entities/music.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { AlbumEntity } from 'src/albums/entities/album.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MusicEntity,AlbumEntity])],
  controllers: [SearchController],
  providers: [SearchService,MusicRepositories,AlbumsRepository],
})
export class SearchModule {}
