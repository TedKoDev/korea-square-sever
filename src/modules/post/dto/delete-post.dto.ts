import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
export class DeletePostDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
