import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "./entities/user.entity"
import { Repository } from "typeorm"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

export class UsersRepository{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) {}
    
      findAll() {
        return this.userRepository
        .createQueryBuilder('user')
        .getMany()
      }
    
      findOne(id: number) {
        return this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id',{id})
        .getMany()
      }
    
      create(data: CreateUserDto) {
        return this.userRepository.save(data)
      }
    
      async update(id: number, data: UpdateUserDto) {
        await this.userRepository.update(id,data)
    
        return this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id',{id})
        .getOne()
      }
    
      async remove(id: number) {
        await this.userRepository.softDelete(id)
    
        return this.userRepository
        .createQueryBuilder('user')
        .withDeleted()
        .where('user.id = :id',{id})
        .getOne()
      }
}