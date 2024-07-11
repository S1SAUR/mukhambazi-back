import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { SearchRepository } from './search.repository';

@Injectable()
export class SearchService {
  
  constructor(private readonly searchRepository: SearchRepository) {}

  search(search: string) {
    return this.searchRepository.search(search);
  }

}
