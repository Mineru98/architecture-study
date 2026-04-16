import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../common/entities';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PubsubModule } from '../pubsub/pubsub.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), PubsubModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
