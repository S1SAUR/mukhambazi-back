import { Module } from '@nestjs/common';
import { MusicServices } from './musics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { MusicRepositories } from './musics.repository';
import { MusicControllers } from './musics.controller';

@Module({
  imports:[TypeOrmModule.forFeature([MusicEntity])],
  controllers: [MusicControllers],
  providers: [MusicServices,MusicRepositories],
})
export class MusicModule {}

