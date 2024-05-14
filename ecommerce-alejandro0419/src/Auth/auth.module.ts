import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../Users/Users.service';
import { UsersRepository } from '../Users/users.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UsersRepository],
})
export class AuthModule {}
