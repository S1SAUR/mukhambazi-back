import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MusicServices } from './musics.service';
import { CreateMusicDto } from './dto/create-musics.dto';
import { UpdateMusicDto } from './dto/update-musics.dto';

@Controller('music')
export class MusicControllers {

  constructor(private readonly musicService: MusicServices) {}

  @Post()
  create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(createMusicDto);
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get(Number(':id'))
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(+id);
  }

  @Patch(Number(':id'))
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(+id, updateMusicDto);
  }

  @Delete(Number(':id'))
  remove(@Param('id') id: string) {
    return this.musicService.remove(+id);
  }
}
