import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsArray()
    @IsOptional()
    musicIds?: number[]

    @IsNumber()
    @IsOptional()
    userId: number

}
