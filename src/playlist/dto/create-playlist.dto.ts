import { IsArray, IsNumber, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    title: string

    @IsString()
    discripton: string

    @IsArray()
    musicIds?: number[]

    @IsNumber()
    userId: number

}
