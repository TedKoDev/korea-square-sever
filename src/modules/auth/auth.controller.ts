import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto'; // SignInDto 임포트

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    console.log('signupDto', signUpDto);
    // 기존에 email이 있는지 확인하고 있으면 에러를 던지고 없으면 회원가입을 진행합니다.
    const user = await this.authService.findByEmail(signUpDto.email);
    if (user) {
      return {
        message: 'Email already exists',
        statusCode: HttpStatus.OK,
      };
    }

    const createdUser = await this.authService.signup(signUpDto);
    return {
      message: 'User created successfully',
      statusCode: HttpStatus.CREATED,
      data: createdUser,
    };
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) signInDto: SignInDto) {
    try {
      const token = await this.authService.login(signInDto);
      return {
        message: 'Login successful',
        statusCode: HttpStatus.OK,
        data: token,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
