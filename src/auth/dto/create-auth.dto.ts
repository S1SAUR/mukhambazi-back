import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateAuthDto {

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string
}
