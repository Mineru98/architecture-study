import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OrderCreatedEvent, OrderStatusChangedEvent } from '../events/order-events';
import { EventStoreService } from '../event-store/event-store.service';
import { OrderProjection } from '../projections/order.projection';

@Injectable()
export class OrderCommandHandler {
  constructor(private eventStore: EventStoreService, private projection: OrderProjection) {}

  async createOrder(userId: string, items: { productId: string; name: string; price: number; quantity: number }[]) {
    const orderId = uuidv4();
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const event = new OrderCreatedEvent(orderId, { userId, items, total, status: 'pending' });
    await this.eventStore.append(event);
    await this.projection.save(this.projection['repo'].create({ id: orderId, userId, items, total, status: 'pending' }));
    return { id: orderId, userId, items, total, status: 'pending' };
  }

  async updateStatus(id: string, status: string) {
    const event = new OrderStatusChangedEvent(id, status);
    await this.eventStore.append(event);
    return this.projection.updateStatus(id, status);
  }
}
