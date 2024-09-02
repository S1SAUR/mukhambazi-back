import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { PlayListRepository } from 'src/playlist/playlist.repository';
import { FavoritesRepository } from 'src/favorites/favorites.repository';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '7d'}
    }),
    PlaylistModule,
    FavoritesModule
  ],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository],
  exports: [UsersRepository]
})
export class UsersModule {}
