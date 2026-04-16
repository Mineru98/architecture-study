import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { GetOrdersHandler } from './features/get-orders/handler';
import { GetOrderHandler } from './features/get-order/handler';
import { CreateOrderHandler } from './features/create-order/handler';
import { UpdateOrderStatusHandler } from './features/update-order-status/handler';
import { CreateOrderDto } from './create-order.dto';
@Controller('orders')
export class OrdersController {
  constructor(
    private getOrders: GetOrdersHandler,
    private getOrder: GetOrderHandler,
    private createOrder: CreateOrderHandler,
    private updateOrderStatus: UpdateOrderStatusHandler,
  ) {}
  @Get() list(@Query('userId') userId?: string) { return this.getOrders.execute(userId); }
  @Get(':id') detail(@Param('id') id: string) { return this.getOrder.execute(id); }
  @Post() create(@Body() dto: CreateOrderDto) { return this.createOrder.execute(dto.userId, dto.items); }
  @Patch(':id/status') updateStatus(@Param('id') id: string, @Body('status') status: string) { return this.updateOrderStatus.execute(id, status); }
}
