import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { OrdersService } from '../../application/services/orders.service';
import { CreateOrderDto } from '../../create-order.dto';
@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}
  @Get() findAll(@Query('userId') userId?: string) { return userId ? this.service.findByUser(userId) : this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateOrderDto) { return this.service.create(dto.userId, dto.items); }
  @Patch(':id/status') updateStatus(@Param('id') id: string, @Body('status') status: string) { return this.service.updateStatus(id, status); }
}
