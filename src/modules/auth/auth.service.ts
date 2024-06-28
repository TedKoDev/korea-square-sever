import { SignUpDto } from './dto/sign-up.dto';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(signUpDto: SignUpDto): Promise<user> {
    const { username, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prismaService.user.create({
      data: {
        username,
        email,
        password_hash: hashedPassword,
      },
    });
  }
}
