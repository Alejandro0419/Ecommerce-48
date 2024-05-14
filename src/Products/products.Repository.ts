import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as data from '../utils/data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { Category } from '../entities/categories.entity';
@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    if (!products) throw new NotFoundException('No se encontraron productos');
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  async getProduct(id: string) {
    const product = await this.productsRepository.findOne({ 
      where: {id: id},
      relations: {
        category: true
      }
    });
    if (!product) {
      throw new NotFoundException(`No se encontro el producto con id ${id}`);
    }
    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();
    for (const element of data) {
        const category = categories.find((category) => category.name === element.category);
        if (!category) {
            const newCategory = new Category();
            newCategory.name = element.category;
            await this.categoriesRepository.createQueryBuilder()
                .insert()
                .into(Category)
                .values(newCategory)
                .execute();
        }

        const product = new Product();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.category = category;

        await this.productsRepository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(product)
            .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
            .execute();
    }
    return 'Productos agregados';
}

  async updateProduct(id: string, product: Partial<Product>) {
    if(!product) throw new BadRequestException('Faltan datos');
    const foundProduct = await this.productsRepository.findOneBy({ id });
    if (!foundProduct) {
      throw new NotFoundException(`No se encontro el producto con id ${id}`);
    }
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOne({ 
      where: {id: id},
      relations: {
        category: true
      }
    });
    return updatedProduct;
  }

  async uploadProductImg(imgUrl: string, id: string) {
    const foundProduct = await this.productsRepository.findOneBy({ id });
    if (!foundProduct) {
      throw new NotFoundException(`No se encontro el producto con id ${id}`);
    }
    await this.productsRepository
      .createQueryBuilder()
      .update(Product)
      .set({ imgUrl })
      .where('id = :id', { id })
      .execute();

    return `Imagen de ${id} actualizada a ${imgUrl}`;
  }

  async deleteProduct(id: string) {
    const foundProduct = await this.productsRepository.findOneBy({ id });
    if (!foundProduct) {
      throw new NotFoundException(`No se encontro el producto con id ${id}`);
    }
    this.productsRepository.delete(id);
    return `Producto con id ${id} eliminado`;
  }

  async createProduct(product: Partial<Product>, categoryName: string) {
    const { name } = product;
    const foundProduct = await this.productsRepository.findOneBy({ name });
    if (foundProduct) {
      throw new BadRequestException(`El producto con nombre ${name} ya existe`);
    }
    const categories = await this.categoriesRepository.find();
    const category = categories.find((category) => category.name === categoryName);
    if (!category) throw new NotFoundException(`La categoria ${categoryName} no existe`);
    product.category = category;
    return this.productsRepository.save(product);
  }

  async deleteSeeder() {
    /* const products: Product[] = await this.productsRepository.find();


    for (const product of products) {
      const foundProduct = data.find((element) => element.name === product.name);
      if (foundProduct) {
        console.log(foundProduct)
        //await this.productsRepository.delete(product.id);
      }
    }
    return 'Productos eliminados';
    */
  } 
}
