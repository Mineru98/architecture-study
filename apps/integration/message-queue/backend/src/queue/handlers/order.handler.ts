import { Injectable } from '@nestjs/common';
import { OrderService } from '../../orders/order.service';
import { QueueMessage } from '../queue.service';

@Injectable()
export class OrderHandler {
  constructor(private orderService: OrderService) {}

  async handle(message: QueueMessage): Promise<void> {
    console.log(`[Handler] Processing ${message.type}: ${message.id}`);

    switch (message.type) {
      case 'create_order':
        const { userId, items, total } = message.payload;
        const order = await this.orderService.create(userId, items, total);
        console.log(`[Handler] Order created: ${order.id}`);
        break;
      default:
        throw new Error(`Unknown message type: ${message.type}`);
    }
  }
}
