import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as Bcrypt from "bcrypt"
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository){}

  async LoginUser(createAuthDto: CreateAuthDto) {

   let user = await this.userRepository.findUserByEmail(createAuthDto.email)
   if(user){
    if(await Bcrypt.compare(createAuthDto.password,user.password)){
        return 'success!'
    }
   }
   throw new BadRequestException('bed request')
  }
}
