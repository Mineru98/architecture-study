import { OrderAggregate } from './order.aggregate';
export interface IOrderRepository {
  findByUser(userId: string): Promise<OrderAggregate[]>;
  findOne(id: string): Promise<OrderAggregate | null>;
  save(order: OrderAggregate): Promise<OrderAggregate>;
  updateStatus(id: string, status: string): Promise<OrderAggregate | null>;
  findAll(): Promise<OrderAggregate[]>;
}
