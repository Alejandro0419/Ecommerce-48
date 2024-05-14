import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.Repository';
import { User } from 'src/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }
  getUser(id: string) {
    return this.usersRepository.getUserById(id);
  }
  getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }

  addUser(user: Partial<User>) {
    return this.usersRepository.addUser(user);
  }

  updateUser(id: string, user: Partial<User>) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
  setAdmin(id: string) {
    return this.usersRepository.setAdmin(id);
  }

  /* addUsers(){
    return this.usersRepository.addUsers();
  }
  deleteSeeder(){
    return this.usersRepository.deleteSeeder();
  } */
}
