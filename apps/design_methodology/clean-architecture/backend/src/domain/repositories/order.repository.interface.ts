import { OrderEntity } from '../entities/order.entity';
export interface IOrderRepository {
  findByUser(userId: string): Promise<OrderEntity[]>;
  findOne(id: string): Promise<OrderEntity | null>;
  create(order: OrderEntity): Promise<OrderEntity>;
  updateStatus(id: string, status: string): Promise<OrderEntity | null>;
  findAll(): Promise<OrderEntity[]>;
}
