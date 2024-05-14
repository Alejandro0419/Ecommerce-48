import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import * as data from '../utils/users.data.json';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    const foundUsers = await this.usersRepository.find();
    if (!foundUsers) throw new NotFoundException(`No se encontraron usuarios`);
    const start = (page - 1) * limit;
    const end = start + limit;
    let users = foundUsers.map(
      ({ password, ...userNoPassword }) => userNoPassword,
    );
    return users.slice(start, end);
  }
  async getUserById(id: string) {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser)
      throw new NotFoundException(`No se encontro el usuario con id ${id}`);
    const { password, ...userNoPassword } = foundUser;
    return userNoPassword;
  }
  async getUserByEmail(email: string) {
    const foundUser = await this.usersRepository.findOneBy({ email });
    if (foundUser) return foundUser;
  }

  async addUser(user: Partial<User>) {
    const { email } = user;
    const foundUser = await this.usersRepository.findOneBy({ email });
    if (foundUser) {
      throw new BadRequestException(`El usuario con email ${email} ya existe`);
    }

    await this.usersRepository.save(user);
    const dbUser = await this.usersRepository.findOneBy({ email });
    const { role, password, ...userNoPassword } = dbUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: Partial<User>) {
    const foundUser = await this.usersRepository.findOneBy({ id });

    if (!foundUser)
      throw new NotFoundException(`No se encontro el usuario con id ${id}`);

    const updatedUser = await this.usersRepository.save({
      ...foundUser,
      ...user,
    });
    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser)
      throw new NotFoundException(`No se encontro el usuario con id ${id}`);

    this.usersRepository.delete({ id });
    return `Usuario con id ${id} borrado`;
  }
  async setAdmin(id: string) {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser)
      throw new NotFoundException(`No se encontro el usuario con id ${id}`);
    const updatedUser = await this.usersRepository.save({
      ...foundUser,
      role: 'admin',
    });
    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword;
  }

/*   async addUsers(){
    for (const element of data) {
      
        await this.usersRepository.save(element);
    }
    return 'Usuarios agregados';
  }

  async deleteSeeder() {
    const users = await this.usersRepository.find({
      relations: {orders: true}
    });

    for (const user of users) {
      if (user.orders.length !== 0) throw new NotAcceptableException('No se pueden borrar los usuarios, porque tienen ordenes creadas');
      if (!data.some(element => element.email === user.email)) {
        await this.usersRepository.delete({ email: user.email });
      }
    }
  } */
}
