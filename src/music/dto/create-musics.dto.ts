import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  authorId: number;
}
