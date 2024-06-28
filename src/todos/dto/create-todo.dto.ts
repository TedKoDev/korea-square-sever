import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString({
    message: 'Title must be a string@@@',
  })
  title: string;
  @IsBoolean()
  is_done: boolean;
}
