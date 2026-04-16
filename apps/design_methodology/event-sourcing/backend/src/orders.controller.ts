import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { OrderCommandHandler } from './commands/order.commands';
import { OrderProjection } from './projections/order.projection';
import { CreateOrderDto } from './create-order.dto';
@Controller('orders')
export class OrdersController {
  constructor(private commands: OrderCommandHandler, private projection: OrderProjection) {}
  @Get() findAll(@Query('userId') userId?: string) { return userId ? this.projection.findByUser(userId) : this.projection.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.projection.findOne(id); }
  @Post() create(@Body() dto: CreateOrderDto) { return this.commands.createOrder(dto.userId, dto.items); }
  @Patch(':id/status') updateStatus(@Param('id') id: string, @Body('status') status: string) { return this.commands.updateStatus(id, status); }
}
