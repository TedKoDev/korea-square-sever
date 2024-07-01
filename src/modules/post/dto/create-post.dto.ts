import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional() // 이 필드를 선택적으로 만듭니다.
  userId: number;

  @IsOptional()
  @IsInt()
  point?: number;

  @IsOptional()
  password?: string;
}
