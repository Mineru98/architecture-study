import { Injectable, Inject } from '@nestjs/common';
import { IOrderUseCase } from '../ports/in/order.usecase';
import { IOrderRepository } from '../ports/out/order.repository';
import { OrderItem } from '../domain/order';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService implements IOrderUseCase {
  constructor(@Inject('IOrderRepository') private repo: IOrderRepository) {}
  getOrders(userId?: string) { return userId ? this.repo.findByUser(userId) : this.repo.findAll(); }
  getOrder(id: string) { return this.repo.findOne(id); }
  async createOrder(userId: string, items: OrderItem[]) {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return this.repo.save({ id: uuidv4(), userId, items, total, status: 'pending', createdAt: new Date() });
  }
  updateOrderStatus(id: string, status: string) { return this.repo.updateStatus(id, status); }
}
