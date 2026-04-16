import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../common/entities';
import { OrdersService } from './orders.service';
import { OrderResolver } from './order.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrdersService, OrderResolver],
  exports: [OrdersService],
})
export class OrdersModule {}
