import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthMiddleware } from './modules/auth/auth.middleware';

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

  // 전역 미들웨어로 AuthMiddleware 적용, 특정 경로는 제외
  app.use((req, res, next) => {
    if (req.path === '/v1/auth/login' || req.path === '/v1/auth/signup') {
      return next();
    }
    new AuthMiddleware().use(req, res, next);
  });

  // 전역 미들웨어로 AuthMiddleware 적용
  // app.use(new AuthMiddleware().use);
  app.useGlobalPipes(new ValidationPipe()); // 추가
  app.useGlobalInterceptors(new LoggingInterceptor()); // 추가
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization', // Authorization 헤더를 허용
  });

  // app.useGlobalInterceptors(new LoggingInterceptor()); // 추가
  // app.enableCors({
  //   origin: ['https://koreasquare.co.kr', 'https://www.koreasquare.co.kr'],
  //   credentials: true,
  // });
  await app.listen(4000);
}
bootstrap();
