import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  category?: string;

  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  point?: number;

  @IsOptional()
  password?: string;
}
