import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,
        is_done: createTodoDto.is_done,
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  async findOne(id: number): Promise<Todo | null> {
    return this.prismaService.todo.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prismaService.todo.update({
      where: {
        id,
      },
      data: {
        title: updateTodoDto.title,
        is_done: updateTodoDto.is_done,
      },
    });
  }

  // 삭제는 soft delete로 구현
  async remove(id: number): Promise<Todo> {
    return this.prismaService.todo.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
