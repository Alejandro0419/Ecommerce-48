import { Controller, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { RolesGuard } from 'src/Auth/guards/roles.guard';
import { ProductsService } from 'src/Products/Products.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role.enum';

@Controller('seeder')
export class SeederController {
    constructor(

    ){}


}
