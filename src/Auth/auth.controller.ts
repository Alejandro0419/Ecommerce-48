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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signin')
  @ApiOperation({
    summary: 'Logs in an existing user to create Token.',
    description:
      'Expects the credentials of the email and password, through the Body. Returns a status message, the token and the User object.',
  })
  signIn(@Body() signInData: LoginUserDto) {
    return this.authService.signIn(signInData);
  }

  @HttpCode(201)
  @Post('signup')
  @ApiOperation({
    summary: 'Create a new user.',
    description:
      'Expects all of the properties of the user through the Body. Returns the created User object and a login token.',
  })
  @UseInterceptors(DateAdderInterceptor)
  signUp(
    @Body() user: CreateUserDto,
    @Req() request: Request & { now: string },
  ) {
    return this.authService.signUp(user);
  }
}
