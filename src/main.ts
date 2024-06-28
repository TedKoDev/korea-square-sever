import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Korea-Square')
    .setDescription('The Korea-Square API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:4000', 'Local Server')
    .addServer('http://127.0.0.1:5000', 'Production Server')
    // .addTag('AuthAPI', '회원가입 및 로그인 로그아웃 관련 API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe()); // 추가
  app.useGlobalInterceptors(new LoggingInterceptor()); // 추가

  await app.listen(4000);
}
bootstrap();
