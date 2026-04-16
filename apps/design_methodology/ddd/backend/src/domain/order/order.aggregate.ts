import { v4 as uuidv4 } from 'uuid';

export interface OrderItem { productId: string; name: string; price: number; quantity: number; }

export class OrderAggregate {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: Date;

  static create(userId: string, items: OrderItem[]): OrderAggregate {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = new OrderAggregate();
    order.id = uuidv4();
    order.userId = userId;
    order.items = items;
    order.total = total;
    order.status = 'pending';
    order.createdAt = new Date();
    return order;
  }

  markAsPaid() { this.status = 'paid'; }
  markAsShipped() { this.status = 'shipped'; }
  markAsDelivered() { this.status = 'delivered'; }
  cancel() { this.status = 'cancelled'; }
}
