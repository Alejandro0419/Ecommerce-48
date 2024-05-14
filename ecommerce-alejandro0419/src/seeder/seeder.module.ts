import { Module, OnModuleInit } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { ProductsService } from 'src/Products/Products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Category } from 'src/entities/categories.entity';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { ProductsRepository } from 'src/Products/products.Repository';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Category])],
  controllers: [SeederController],
  providers: [ProductsService, ProductsRepository, CategoriesService, CategoriesRepository],

})
export class SeederModule implements OnModuleInit{
  constructor (
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async onModuleInit() {
    const categories = await this.categoriesService.getCategories();
    if (categories.length === 0) {
      await this.categoriesService.addCategories();
      
    }
    const products = await this.productsService.getProducts(1, 10);
    if(products.length === 0) {
      await this.productsService.addProducts();
    }
  }
}
