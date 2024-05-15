import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  HttpCode,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './ordersDto/orders.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { RolesGuard } from 'src/Auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role.enum';

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(200)
  @Get(':id')
  getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }

  @HttpCode(200)
  @Get()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards( RolesGuard)
  @ApiQuery({ name: 'page', description: 'Página a mostrar', required: false })
  @ApiQuery({ name: 'limit', description: 'Límite de resultados por página', required: false })
  getOrders(@Query('page') page: string,@Query('limit') limit: string) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 20;
    return this.ordersService.getOrders(pageNumber, limitNumber);
  }

  @HttpCode(201)
  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    return this.ordersService.addOrder(order.userId, order.products);
  }
  
 
}
