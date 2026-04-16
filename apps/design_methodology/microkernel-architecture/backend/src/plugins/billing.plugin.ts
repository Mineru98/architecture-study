import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { OrderPlugin } from '../core/order.service';

@Injectable()
export class BillingPlugin implements OrderPlugin {
  name = 'BillingPlugin';
  constructor(@Inject('REDIS') private redis: Redis) {}
  async onOrderCreated(order: any) {
    await this.redis.set(`billing:${order.id}`, JSON.stringify({ orderId: order.id, total: order.total, status: 'invoiced' }));
    console.log(`[BillingPlugin] Invoice created for order ${order.id}, total: ${order.total}`);
  }
}
