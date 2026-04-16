import { Order } from '../../../../entities';

export interface IOrderRepository {
  findAll(userId?: string): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  create(data: Partial<Order>): Promise<Order>;
  updateStatus(id: string, status: string): Promise<Order | null>;
}
