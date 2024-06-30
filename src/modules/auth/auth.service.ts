import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto'; // SignInDto 임포트
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // JwtService 임포트

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {} // JwtService 주입

  async findByEmail(email: string): Promise<user | null> {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

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

  async validateUser(email: string, password: string): Promise<user | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      return user;
    }
    return null;
  }

  async login(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { email, password } = signInDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
