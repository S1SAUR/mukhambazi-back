import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async LoginUser(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.LoginUser(createAuthDto);
  }

}
