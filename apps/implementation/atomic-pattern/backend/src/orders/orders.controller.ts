import { Controller, Get, Post, Param, Body, Headers } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '../entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Headers('authorization') auth: string): Promise<Order[]> {
    const token = auth?.replace('Bearer ', '');
    return this.ordersService.findAll(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(
    @Headers('authorization') auth: string,
    @Body() dto: CreateOrderDto,
  ): Promise<Order> {
    const token = auth?.replace('Bearer ', '');
    return this.ordersService.create(token, dto);
  }
}
