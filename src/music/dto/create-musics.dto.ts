import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name: string;

  @IsNumber()
  authorId: number;
    @IsNumber()
    authorId: number

    @IsNumber()
    albumId: number
}
