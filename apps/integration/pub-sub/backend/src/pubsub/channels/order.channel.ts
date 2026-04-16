import { Injectable, OnModuleInit } from '@nestjs/common';
import { SubscriberService } from '../subscriber.service';

@Injectable()
export class OrderChannel implements OnModuleInit {
  constructor(private subscriberService: SubscriberService) {}

  async onModuleInit() {
    // Notification subscriber
    await this.subscriberService.subscribe('order:created', async (channel, data) => {
      console.log(`[Notification] New order ${data.orderId} created by ${data.userId} - total: ${data.total}`);
    });

    // Inventory update subscriber
    await this.subscriberService.subscribe('order:created', async (channel, data) => {
      console.log(`[Inventory] Updating inventory for order ${data.orderId}`);
      if (data.items) {
        data.items.forEach((item: any) => {
          console.log(`[Inventory] Reducing stock for ${item.name} by ${item.quantity}`);
        });
      }
    });

    // Analytics subscriber
    await this.subscriberService.subscribe('order:created', async (channel, data) => {
      console.log(`[Analytics] Recording order ${data.orderId} for analytics - total: ${data.total}`);
    });

    // Status change subscribers
    await this.subscriberService.subscribe('order:statusChanged', async (channel, data) => {
      console.log(`[Notification] Order ${data.orderId} status changed to ${data.newStatus}`);
    });

    await this.subscriberService.subscribe('order:statusChanged', async (channel, data) => {
      console.log(`[Analytics] Status change recorded: ${data.orderId} -> ${data.newStatus}`);
    });

    console.log('[OrderChannel] All subscribers initialized');
  }
}
