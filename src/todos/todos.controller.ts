import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('todos')
@ApiBearerAuth()
@UseInterceptors(LoggingInterceptor)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);
    return {
      message: 'Todo created successfully',
      statusCode: HttpStatus.CREATED,
      data: createdTodo,
    };
  }

  @Get()
  async findAll() {
    const allTodos = await this.todosService.findAll();
    return {
      message: 'Todos retrieved successfully',
      statusCode: HttpStatus.OK,
      data: allTodos,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foundTodo = await this.todosService.findOne(+id);
    if (!foundTodo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Todo retrieved successfully',
      statusCode: HttpStatus.OK,
      data: foundTodo,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const foundTodo = await this.todosService.findOne(+id);
    if (!foundTodo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    const updatedTodo = await this.todosService.update(+id, updateTodoDto);
    return {
      message: 'Todo updated successfully',
      statusCode: HttpStatus.OK,
      data: updatedTodo,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const foundTodo = await this.todosService.findOne(+id);
    if (!foundTodo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    const deletedTodo = await this.todosService.remove(+id);
    return {
      message: 'Todo deleted successfully',
      statusCode: HttpStatus.OK,
      data: deletedTodo,
    };
  }
}
