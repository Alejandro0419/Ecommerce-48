import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductsController } from './Products.controller';
import { ProductsService } from './Products.service';
import { ProductsRepository } from './products.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { Category } from '../entities/categories.entity';
import { CategoriesRepository } from '../categories/categories.repository';
import { CategoriesService } from '../categories/categories.service';
import { CloudinaryConfig } from '../config/cloudinary';
import { CloudinaryService } from '../common/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    //TypeOrmModule.forFeature([Category]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    CategoriesService,
    CategoriesRepository,
    CloudinaryConfig,
    CloudinaryService,
  ],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(ProductsController);
  }
}
