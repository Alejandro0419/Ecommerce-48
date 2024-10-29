import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './Users.service';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { Role } from '../role.enum';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../Auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './userDto/updateUsers.dto';
import { User } from 'src/entities/users.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description:
      'Doesn`t expect any parameters. Returns an array of User objects.',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({ name: 'page', description: 'Página a mostrar', required: false })
  @ApiQuery({ name: 'limit', description: 'Límite de resultados por página', required: false})
  getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 20;
    return this.usersService.getUsers(pageNumber, limitNumber);
  }

  @HttpCode(200)
  @Get(':id')
  @ApiOperation({
    summary: 'Get a single user by Id',
    description:
      'Expects an UUID through Params. Returns a single User object.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', ParseUUIDPipe) id: string, @Req() request:Request & {user: User}) {
    const reqUser = request.user;
  
    const userToModify = await this.usersService.getUser(id);
    if(
      (reqUser.role === Role.User && reqUser.id === id) ||
      (reqUser.role === Role.Admin && (userToModify.role === Role.User || reqUser.id === id)) ||
      (reqUser.role === Role.SuperAdmin && (userToModify.role !== Role.SuperAdmin || reqUser.id === id))
    )
    return await this.usersService.getUser(id);
    else{
      throw new ForbiddenException('No tiene permisos para acceder a esta ruta.');
    }
  }

  @HttpCode(200)
  @Put(':id')
  @ApiOperation({
    summary: 'Updates a user´s properties.',
    description:
      'Expects the UUID of the user to modify through Params and the properties to change through the Body. Returns the modified User object.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto, @Req() request:Request & {user: User}) {
      if (!user|| Object.keys(user).length === 0) throw new BadRequestException('Faltan datos');
      const reqUser = request.user;
  
      const userToModify = await this.usersService.getUser(id);
      if(
        (reqUser.role === Role.User && reqUser.id === id) ||
        (reqUser.role === Role.Admin && (userToModify.role === Role.User || reqUser.id === id)) ||
        (reqUser.role === Role.SuperAdmin && (userToModify.role !== Role.SuperAdmin || reqUser.id === id))
      )
        return this.usersService.updateUser(id, user);
        else{
          throw new ForbiddenException('No tiene permisos para acceder a esta ruta.');
        }
    }

  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a user.',
    description:
      'Expects the UUID of the user to delete through Params. Returns a succes or failure message.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string, @Req() request:Request & {user: User}) {
    const reqUser = request.user;
  
    const userToModify = await this.usersService.getUser(id);
    if(
      (reqUser.role === Role.User && reqUser.id === id) ||
      (reqUser.role === Role.Admin && (userToModify.role === Role.User || reqUser.id === id)) ||
      (reqUser.role === Role.SuperAdmin && (userToModify.role !== Role.SuperAdmin || reqUser.id === id))
    )
    return this.usersService.deleteUser(id);
    else{
      throw new ForbiddenException('No tiene permisos para acceder a esta ruta.');
    }
  }

/*   @HttpCode(200)
  @Put('setAdmin/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin)
  setAdmin(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.setAdmin(id);
  } */

/*   @HttpCode(200)
  @Get('seeder')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addProducts() {
    return this.usersService.addUsers();
  }
  
  @HttpCode(200)
  @Delete('seeder')
  @ApiBearerAuth()
   @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteSeeder() {
    return this.usersService.deleteSeeder();
  } */

}
