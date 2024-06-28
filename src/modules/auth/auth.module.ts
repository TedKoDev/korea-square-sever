// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // PrismaModule 임포트

@Module({
  imports: [PrismaModule], // PrismaModule 추가
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
