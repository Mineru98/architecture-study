import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { OrderPlugin } from '../core/order.service';

@Injectable()
export class ReportPlugin implements OrderPlugin {
  name = 'ReportPlugin';
  constructor(@Inject('REDIS') private redis: Redis) {}
  async onOrderCreated(order: any) {
    await this.redis.incr('stats:total_orders');
    await this.redis.incrbyfloat('stats:total_revenue', order.total);
    console.log(`[ReportPlugin] Stats updated for order ${order.id}`);
  }
}
