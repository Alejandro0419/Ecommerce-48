import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersRepository } from '../Users/users.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/orders.entity';
import { OrdersRepository } from './orders.repository';
import { User } from '../entities/users.entity';
import { OrderDetails } from '../entities/orderDetails.entity';
import { ProductsRepository } from '../Products/products.Repository';
import { Product } from '../entities/products.entity';
import { Category } from '../entities/categories.entity';
import { CategoriesRepository } from '../categories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order,User,OrderDetails,Product, Category])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, UsersRepository, ProductsRepository,CategoriesRepository],
})
export class OrdersModule {}
