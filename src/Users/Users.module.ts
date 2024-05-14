import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './Users.controller';
import { UsersService } from './Users.service';
import { UsersRepository } from './users.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { AuthService } from '../Auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthService],
})
export class UsersModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(UsersController);
  }
}
