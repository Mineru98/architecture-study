import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderProducer } from '../queue/producers/order.producer';

@Controller('v1/orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private orderProducer: OrderProducer,
  ) {}

  @Get()
  async findAll(@Body('userId') userId?: string) {
    const orders = await this.orderService.findAll(userId);
    return { data: orders, statusCode: HttpStatus.OK };
  }

  @Post()
  async create(@Body() body: { userId: string; items: any[]; total: number }) {
    // API -> Producer -> Queue -> Consumer -> Handler
    const message = await this.orderProducer.produce(body);
    return { data: { messageId: message.id, status: 'queued', info: '주문이 큐에 등록되었습니다.' }, statusCode: HttpStatus.ACCEPTED };
  }
}
