import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { GetOrdersUseCase, GetOrderUseCase, CreateOrderUseCase, UpdateOrderStatusUseCase } from '../../domain/usecases/order.usecases';
import { CreateOrderDto } from '../../create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly getOrders: GetOrdersUseCase,
    private readonly getOrder: GetOrderUseCase,
    private readonly createOrder: CreateOrderUseCase,
    private readonly updateOrderStatus: UpdateOrderStatusUseCase,
  ) {}

  @Get() list(@Query('userId') userId?: string) { return this.getOrders.execute(userId); }
  @Get(':id') detail(@Param('id') id: string) { return this.getOrder.execute(id); }
  @Post() create(@Body() dto: CreateOrderDto) { return this.createOrder.execute(dto.userId, dto.items); }
  @Patch(':id/status') updateStatus(@Param('id') id: string, @Body('status') status: string) { return this.updateOrderStatus.execute(id, status); }
}
