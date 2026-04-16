import { OrderDomain, OrderItem } from '../../domain/order';
export interface IOrderUseCase {
  getOrders(userId?: string): Promise<OrderDomain[]>;
  getOrder(id: string): Promise<OrderDomain | null>;
  createOrder(userId: string, items: OrderItem[]): Promise<OrderDomain>;
  updateOrderStatus(id: string, status: string): Promise<OrderDomain | null>;
}
