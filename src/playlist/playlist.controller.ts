import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { JwtAuthGuard } from './playlist.guard';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findOneUsersAllPlayList(@Req() req) {
    const userId = req.user.id;
    return this.playlistService.findOneUsersAllPlayList(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto, @Req() req) {
    const userId = req.user.id;
    return this.playlistService.create(createPlaylistDto, userId);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }
}
