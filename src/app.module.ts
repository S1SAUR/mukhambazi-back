import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicModule } from './music/musics.module';
import { AuthorsModule } from './authors/authors.module';
import { AlbumModule } from './albums/albums.module';
import { SearchModule } from './search/search.module';
import { UsersModule } from './users/users.module';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'chakrulos.cj40ww6mww3k.eu-central-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'Dachiko123321',
      database: 'chakrulodb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/'
    }),
    MusicModule,
    AuthorsModule,
    AlbumModule,
    SearchModule,
    UsersModule,
    PlaylistModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
