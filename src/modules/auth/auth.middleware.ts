import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('AuthMiddleware IN'); // 디버깅용 로그 추가

    // 사전 요청 (OPTIONS) 무시
    if (req.method === 'OPTIONS') {
      return next();
    }

    const authHeader = req.headers.authorization;
    // console.log('Authorization Header:', authHeader); // 헤더 전체 로그 추가

    const token = authHeader && authHeader.split(' ')[1];
    // console.log('Token:', token); // 디버깅용 로그 추가

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, 'yourSecretKey'); // 비밀 키를 맞추세요
      req.user = decoded; // 사용자 정보를 req.user에 추가
      // console.log('Decoded JWT:', decoded); // 디버깅용 로그 추가
      next();
    } catch (error) {
      // console.error('JWT verification failed:', error); // 에러 로그 추가
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
