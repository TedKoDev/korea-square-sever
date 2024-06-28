import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  getHello(@Param('name') name: string) {
    return '뚱냐 ' + name + '님 안녕하세요!';
    // return this.appService.getHello();
  }
}
