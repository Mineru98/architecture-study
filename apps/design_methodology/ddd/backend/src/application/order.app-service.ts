import { Injectable, Inject } from '@nestjs/common';
import { IOrderRepository } from '../domain/order/order.repository';
import { OrderAggregate, OrderItem } from '../domain/order/order.aggregate';

@Injectable()
export class OrderAppService {
  constructor(@Inject('IOrderRepository') private repo: IOrderRepository) {}

  getOrders(userId?: string) { return userId ? this.repo.findByUser(userId) : this.repo.findAll(); }
  getOrder(id: string) { return this.repo.findOne(id); }
  async createOrder(userId: string, items: OrderItem[]) {
    const order = OrderAggregate.create(userId, items);
    return this.repo.save(order);
  }
  updateOrderStatus(id: string, status: string) { return this.repo.updateStatus(id, status); }
}
