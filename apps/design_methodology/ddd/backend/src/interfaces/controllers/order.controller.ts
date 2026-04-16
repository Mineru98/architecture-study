import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { OrderAppService } from '../../application/order.app-service';
import { CreateOrderDto } from '../../create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly app: OrderAppService) {}
  @Get() list(@Query('userId') userId?: string) { return this.app.getOrders(userId); }
  @Get(':id') detail(@Param('id') id: string) { return this.app.getOrder(id); }
  @Post() create(@Body() dto: CreateOrderDto) { return this.app.createOrder(dto.userId, dto.items); }
  @Patch(':id/status') updateStatus(@Param('id') id: string, @Body('status') status: string) { return this.app.updateOrderStatus(id, status); }
}
