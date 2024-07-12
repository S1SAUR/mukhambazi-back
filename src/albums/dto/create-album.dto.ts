import { IsArray, IsDate, IsNumber, IsString } from "class-validator";

export class CreateAlbumDto {
    
    @IsString()
    name: string;

    @IsString()
    artistName: string;

    @IsString()
    releaseDate: string;

    @IsNumber()
    authorId: number;
}
