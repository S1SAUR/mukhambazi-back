import { Module } from '@nestjs/common';
import { MusicServices } from './musics.service';
import { MusicControllers } from './musics.scontroller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { MusicRepositories } from './musics.repository';

@Module({
  imports:[TypeOrmModule.forFeature([MusicEntity])],
  controllers: [MusicControllers],
  providers: [MusicServices,MusicRepositories],
})
export class MusicModule {}
