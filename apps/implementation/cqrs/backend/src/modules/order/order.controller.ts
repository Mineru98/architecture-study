import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { OrderCommandService } from './commands/order-command.service';
import { OrderQueryService } from './queries/order-query.service';

@Controller('orders')
export class OrderController {
  constructor(
    private commandService: OrderCommandService,
    private queryService: OrderQueryService,
  ) {}

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.queryService.getOrders(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryService.getOrder(id);
  }

  @Post()
  create(@Body() body: { userId: string; items: any[]; total: number }) {
    return this.commandService.createOrder(body.userId, body.items, body.total);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.commandService.updateOrderStatus(id, status);
  }
}
