import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicModule } from './music/musics.module';
import { AuthorsModule } from './authors/authors.module';
import { AlbumModule } from './albums/albums.module';
import { SearchModule } from './search/search.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'S1sa.123',
      database: 'chakrulo',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    MusicModule,
    AuthorsModule,
    AlbumModule,
    SearchModule,
    UsersModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
