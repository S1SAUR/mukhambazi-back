import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as Bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository){}

  async LoginUser(createAuthDto: CreateAuthDto) {

   let user = await this.userRepository.findUserByEmail(createAuthDto.email)
   if(user){
    if(await Bcrypt.compare(createAuthDto.password,user.password)){
        return 'sucses!'
    }
   }else{
    throw new BadRequestException('email not found')
   }
   throw new BadRequestException('not sucses')

  }
}
