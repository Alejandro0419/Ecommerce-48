import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategories() {

    for (const element of data) {
      const newCategory = element.category;
      const categories = await this.categoriesRepository.find();
      if(!categories.some((foundCategory) => foundCategory.name === newCategory)) {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: newCategory })
          .orIgnore() 
          .orUpdate(['name'])
          .execute();
          console.log(`Se ha creado la categoría ${newCategory}`);
        } else {
          console.log(`La categoría ${newCategory} ya existe`);
        }
      }
      return 'Categorias Agregadas';
      
  }

/*   async addCategory(category: Partial<Category>) {
    return await this.categoriesRepository
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(category)
      .orIgnore()
      .orUpdate(['name'])
      .execute();
  } */

/*   async updateCategory(id: string, category: Partial<Category>) {
    return await this.categoriesRepository
      .createQueryBuilder()
      .update(Category)
      .set(category)
      .where('id = :id', { id })
      .execute();
  } */

}
