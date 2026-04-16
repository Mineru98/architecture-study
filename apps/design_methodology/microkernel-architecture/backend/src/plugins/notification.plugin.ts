import { Injectable } from '@nestjs/common';
import { OrderPlugin } from '../core/order.service';

@Injectable()
export class NotificationPlugin implements OrderPlugin {
  name = 'NotificationPlugin';
  async onOrderCreated(order: any) { console.log(`[NotificationPlugin] Order ${order.id} created for user ${order.userId}`); }
  async onOrderStatusChanged(order: any, status: string) { console.log(`[NotificationPlugin] Order ${order.id} status changed to ${status}`); }
}
