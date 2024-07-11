import { Module } from '@nestjs/common';
import { AlbumService } from './albums.service';
import { AlbumController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumsRepository],
})
export class AlbumModule {}
