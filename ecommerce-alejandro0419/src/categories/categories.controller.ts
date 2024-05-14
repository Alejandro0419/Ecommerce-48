import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../role.enum';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { RolesGuard } from '../Auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @HttpCode(200)
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @HttpCode(200)
  @Get('seeder')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  addCategories() {
    return this.categoriesService.addCategories();
  }
}
