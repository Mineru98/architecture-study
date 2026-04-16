import { Controller, Get, Post, Patch, Param, Body, HttpStatus, NotFoundException } from '@nestjs/common';
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

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const order = await this.service.updateStatus(id, status);
    if (!order) throw new NotFoundException({ error: 'Not Found', message: `Order ${id} not found`, statusCode: 404 });
    return { data: order, statusCode: HttpStatus.OK };
  }
}
