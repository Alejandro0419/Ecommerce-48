import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/orders.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from '../entities/orderDetails.entity';
import { User } from 'src/entities/users.entity';
import { Product } from 'src/entities/products.entity';
import { CreateOrderDto } from './ordersDto/orders.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailRepository: Repository<OrderDetails>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async addOrder(userId: string, products: Product[]) {
    let total = 0;
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw `No se encontro el usuario con id ${userId}`;
    }

    const checkedProductIds = new Set();

    for (const product of products) {
      const foundProduct = await this.productsRepository.findOneBy({
        id: product.id,
      });
      if (!foundProduct)
        throw new NotFoundException(
          `No se encontro el producto con id ${product.id}`,
        );

      if (checkedProductIds.has(product.id)) {
        throw new BadRequestException(
          `El producto con id ${foundProduct.id} ya se encuentra en la orden`,
        );
      }

      checkedProductIds.add(product.id);
    }

    const order = new Order();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });
        if (!product) {
          return `No se encontro el producto con id ${element.id}`;
        }

        total += Number(product.price);

        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );

    const orderDetail = new OrderDetails();

    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.orderDetailRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  async getOrder(id: string) {
    const order = this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) {
      return `No se encontro la orden con id ${id}`;
    }
    return order;
  }

  async getOrders(page: number, limit: number): Promise<Order[]> {
    let orders = await this.ordersRepository.find({
      relations: {
        orderDetails: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    orders = orders.slice(start, end);
    return orders;
  }

  async updateOrder(id: string, order: any) {
    if (!order || !id) throw new BadRequestException('Faltan datos');

    const foundOrder = await this.ordersRepository.findOneBy({ id });
    if (!foundOrder)
      throw new BadRequestException(`No se encontro la orden con id ${id}`);

    return this.ordersRepository.update(id, order);
  }

  async deleteOrder(id: string) {
    const foundOrder = await this.ordersRepository.findOneBy({ id });
    if (!foundOrder)
      throw new BadRequestException(`No se encontro la orden con id ${id}`);
    return this.ordersRepository.delete(id);
  }
}
