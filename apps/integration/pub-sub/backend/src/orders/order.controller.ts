import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('v1/orders')
export class OrderController {
  constructor(private service: OrderService) {}

  @Get()
  async findAll(@Body('userId') userId?: string) {
    const orders = await this.service.findAll(userId);
    return { data: orders, statusCode: HttpStatus.OK };
  }

  @Post()
  async create(@Body() body: { userId: string; items: any[]; total: number }) {
    const order = await this.service.create(body.userId, body.items, body.total);
    return { data: order, statusCode: HttpStatus.CREATED };
  }
}
