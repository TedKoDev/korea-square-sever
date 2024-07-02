import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsArray,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsInt()
  point?: number;

  @IsOptional()
  password?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  files?: string[]; // 파일 URL을 저장하기 위한 필드
}
// CreatePostWithUserIdDto를 확장하여 userId를 포함시킵니다.
export class CreatePostWithUserIdDto extends CreatePostDto {
  userId: number;
}
