import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  addOrder(userId: string, products: Product[]) {
    return this.ordersRepository.addOrder(userId, products);
  }

  getOrders(page: number, limit: number) {
    return this.ordersRepository.getOrders(page, limit);
  }

  getOrder(id:string){
    return this.ordersRepository.getOrder(id);
  }

  updateOrder(id: string, order: any) {
    return this.ordersRepository.updateOrder(id, order);
  }

  deleteOrder(id: string) {
    return this.ordersRepository.deleteOrder(id);
  }
}
