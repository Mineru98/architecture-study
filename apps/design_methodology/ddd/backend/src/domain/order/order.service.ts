import { OrderAggregate, OrderItem } from './order.aggregate';
import { IOrderRepository } from './order.repository';

export class OrderDomainService {
  constructor(private orderRepo: IOrderRepository) {}
  createOrder(userId: string, items: OrderItem[]) {
    const order = OrderAggregate.create(userId, items);
    return this.orderRepo.save(order);
  }
}
