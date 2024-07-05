import { Module } from '@nestjs/common';
import { MusicServices } from './musics.service';
import { MusicControllers } from './musics.scontroller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { MusicRepositories } from './musics.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Music])],
  controllers: [MusicControllers],
  providers: [MusicServices,MusicRepositories],
})
export class MusicModule {}
