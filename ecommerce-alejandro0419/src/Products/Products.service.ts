import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.Repository';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }
  addProducts(){ 
    return this.productsRepository.addProducts(); 
  }

  async getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }

  async uploadProductImg(imgUrl: string, id: string){
    return this.productsRepository.uploadProductImg(imgUrl, id);
  }
  async addProduct(product: Partial<Product>, categoryName: string) {
    return this.productsRepository.createProduct(product, categoryName);
  }
  async updateProduct(id: string, product: Partial<Product>) {
    return this.productsRepository.updateProduct(id, product);
  }
  async deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
  async deleteSeeder(){
    return this.productsRepository.deleteSeeder();
  }
}
