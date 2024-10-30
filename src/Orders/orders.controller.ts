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
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Get a single order by Id',
    description:
      'Expects an UUID through Params. Returns a single Order object.',
  })
  getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }

  @HttpCode(200)
  @Get()
  @ApiOperation({
    summary: 'Get all orders',
    description:
      'Doesn`t expect any parameters. Returns an array of Order objects.',
  })

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
  @ApiOperation({
    summary: 'Creates a new order',
    description:
      'Expects the User ID and an array of products id through the Body. Returns the created Order object.',
  })
  addOrder(@Body() order: CreateOrderDto) {
    return this.ordersService.addOrder(order.userId, order.products);
  }
  
 
}
