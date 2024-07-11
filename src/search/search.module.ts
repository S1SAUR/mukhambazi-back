import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchEntity } from './entities/search.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchRepository } from './search.repository';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MusicEntity,SearchEntity,AlbumEntity])],
  controllers: [SearchController],
  providers: [SearchService,SearchRepository],
})
export class SearchModule {}
