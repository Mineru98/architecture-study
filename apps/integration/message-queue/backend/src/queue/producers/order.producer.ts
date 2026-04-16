import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue.service';

@Injectable()
export class OrderProducer {
  constructor(private queueService: QueueService) {}

  async produce(orderData: { userId: string; items: any[]; total: number }) {
    const message = await this.queueService.enqueue('orders', 'create_order', orderData);
    console.log(`[Producer] Order message queued: ${message.id}`);
    return message;
  }
}
