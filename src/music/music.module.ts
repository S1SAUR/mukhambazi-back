import { Module } from '@nestjs/common';
import { MusicServices } from './music.service';
import { MusicControllers } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { MusicRepositories } from './musics.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Music])],
  controllers: [MusicControllers],
  providers: [MusicServices,MusicRepositories],
})
export class MusicModule {}
