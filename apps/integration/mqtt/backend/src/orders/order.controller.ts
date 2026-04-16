import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { MqttService } from '../mqtt/mqtt.service';

@Controller('v1/orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private mqttService: MqttService,
  ) {}

  @Get()
  async findAll(@Body('userId') userId?: string) {
    const orders = await this.orderService.findAll(userId);
    return { data: orders, statusCode: HttpStatus.OK };
  }

  @Post()
  async create(@Body() body: { userId: string; items: any[]; total: number }) {
    const order = await this.orderService.create(body.userId, body.items, body.total);

    // Publish to MQTT topics
    await this.mqttService.publish(`shopping/orders/${order.id}/status`, {
      orderId: order.id,
      status: order.status,
      userId: body.userId,
    });
    await this.mqttService.publish('shopping/orders/+/status', {
      event: 'new_order',
      orderId: order.id,
      total: body.total,
    });

    return { data: order, statusCode: HttpStatus.CREATED };
  }
}
