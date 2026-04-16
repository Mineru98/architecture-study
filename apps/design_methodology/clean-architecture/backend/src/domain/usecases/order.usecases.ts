import { Injectable, Inject } from '@nestjs/common';
import { IOrderRepository } from '../repositories/order.repository.interface';
import { OrderEntity, OrderItem } from '../entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GetOrdersUseCase {
  constructor(@Inject('IOrderRepository') private repo: IOrderRepository) {}
  execute(userId?: string) { return userId ? this.repo.findByUser(userId) : this.repo.findAll(); }
}

@Injectable()
export class GetOrderUseCase {
  constructor(@Inject('IOrderRepository') private repo: IOrderRepository) {}
  execute(id: string) { return this.repo.findOne(id); }
}

@Injectable()
export class CreateOrderUseCase {
  constructor(@Inject('IOrderRepository') private repo: IOrderRepository) {}
  execute(userId: string, items: OrderItem[]) {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order: OrderEntity = { id: uuidv4(), userId, items, total, status: 'pending', createdAt: new Date() };
    return this.repo.create(order);
  }
}

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(@Inject('IOrderRepository') private repo: IOrderRepository) {}
  execute(id: string, status: string) { return this.repo.updateStatus(id, status); }
}
