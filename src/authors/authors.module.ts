import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorEntity } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepositories } from './authors.repository';

@Module({
  imports:[TypeOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorsController],
  providers: [AuthorsService,AuthorRepositories],
})
export class AuthorsModule {}
