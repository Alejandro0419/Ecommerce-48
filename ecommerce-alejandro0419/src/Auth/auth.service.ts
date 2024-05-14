import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../Users/Users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: Partial<User>) {
    const { password, email } = user;
    const dbUser = await this.usersService.getUserByEmail(email);
    if (!dbUser) throw new BadRequestException('Invalid Credentials.');

    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Credentials.');
    }
    const userPayload = {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
    };

    const token = this.jwtService.sign(userPayload);

    return { message: 'User logged in successfully', token };
  }

  async signUp(user: Partial<User>) {
    const dbUser = await this.usersService.getUserByEmail(user.email);
    
    if (dbUser) {
      throw new BadRequestException('Email already in use');
    }
    
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    if (!hashedPassword)
      throw new BadRequestException('Password could not be hashed.');

    const newUser = await this.usersService.addUser({
      ...user,
      password: hashedPassword,
    });

    const token = await this.signIn(user)
    if(!token) throw new BadRequestException('Token could not be generated');

    return { success: 'User created succesfully!', user: newUser, login: token};
  }
}
