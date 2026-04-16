import { Injectable, OnModuleInit } from '@nestjs/common';
import { QueueService } from '../queue.service';
import { OrderHandler } from '../handlers/order.handler';

@Injectable()
export class OrderConsumer implements OnModuleInit {
  private running = false;

  constructor(
    private queueService: QueueService,
    private orderHandler: OrderHandler,
  ) {}

  async onModuleInit() {
    this.running = true;
    this.processLoop();
  }

  private async processLoop() {
    while (this.running) {
      const message = await this.queueService.dequeue('orders');
      if (message) {
        console.log(`[Consumer] Processing message: ${message.id}`);
        try {
          await this.orderHandler.handle(message);
          await this.queueService.moveToHistory('orders', message, 'completed');
          console.log(`[Consumer] Message completed: ${message.id}`);
        } catch (error: any) {
          await this.queueService.moveToHistory('orders', { ...message, error: error.message }, 'failed');
          console.error(`[Consumer] Message failed: ${message.id}`, error.message);
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }
}
