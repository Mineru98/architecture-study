import { Controller, Get, Post, Patch, Param, Body, Query, Inject } from '@nestjs/common';
import { IOrderUseCase } from '../../../ports/in/order.usecase';
import { CreateOrderDto } from '../../../create-order.dto';
@Controller('orders')
export class OrdersController {
  constructor(@Inject('IOrderUseCase') private useCase: IOrderUseCase) {}
  @Get() list(@Query('userId') userId?: string) { return this.useCase.getOrders(userId); }
  @Get(':id') detail(@Param('id') id: string) { return this.useCase.getOrder(id); }
  @Post() create(@Body() dto: CreateOrderDto) { return this.useCase.createOrder(dto.userId, dto.items); }
  @Patch(':id/status') updateStatus(@Param('id') id: string, @Body('status') status: string) { return this.useCase.updateOrderStatus(id, status); }
}
