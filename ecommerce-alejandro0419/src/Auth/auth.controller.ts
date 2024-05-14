import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../Users/userDto/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signin')
  signIn(@Body() signInData: LoginUserDto) {
    return this.authService.signIn(signInData);
  }

  @HttpCode(201)
  @Post('signup')
  @UseInterceptors(DateAdderInterceptor)
  signUp(
    @Body() user: CreateUserDto,
    @Req() request: Request & { now: string },
  ) {
    return this.authService.signUp(user);
  }
}
