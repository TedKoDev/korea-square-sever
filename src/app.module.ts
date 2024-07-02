import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { S3Module } from './modules/s3/s3.module';

@Module({
  imports: [TodosModule, AuthModule, PostModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
