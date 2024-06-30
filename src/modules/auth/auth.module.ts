import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // PrismaModule 임포트
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule, // PrismaModule 추가
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey', // 비밀 키 설정
      signOptions: { expiresIn: '60m' }, // 토큰 유효 기간 설정
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
