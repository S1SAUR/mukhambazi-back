import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorEntity } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthorRepository } from './authors.repository';


@Module({
  imports:[TypeOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorsController],
  providers: [AuthorsService,AthorRepository],
})
export class AuthorsModule {}
