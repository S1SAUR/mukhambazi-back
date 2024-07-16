import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "./entities/user.entity"
import { Repository } from "typeorm"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

export class UsersRepository{

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(){
    return await this.usersRepository
    .createQueryBuilder('users')
    .select([
      'users.id',
      'users.name',
      'users.createdAt',
      'users.updatedAt',
      'users.delatedAt'
    ])
    .getMany()
  }

  async findOne(id: number) {
    return await this.usersRepository
    .createQueryBuilder('users')
    .where('users.id = :id',{id})
    .select([
      'users.id',
      'users.name',
      'users.createdAt',
      'users.updatedAt',
      'users.delatedAt'
    ])
    .getOne()
  }

  async create(data: CreateUserDto) {
    return await this.usersRepository.save(data)
  }

  async update(id: number, data: UpdateUserDto) {
    
    await this.usersRepository.update(id,data)

    return this.usersRepository
    .createQueryBuilder('users')
    .where('users.id = :id',{id})
    .getOne()
  }

  async remove(id: number) {
    await this.usersRepository.softDelete(id)

    return this.usersRepository
    .createQueryBuilder('users')
    .withDeleted()
    .where('users.id = :id',{id})
    .getOne()
  }
}