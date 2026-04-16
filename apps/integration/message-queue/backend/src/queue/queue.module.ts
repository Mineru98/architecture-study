import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { OrderProducer } from './producers/order.producer';
import { OrderConsumer } from './consumers/order.consumer';
import { OrderHandler } from './handlers/order.handler';
import { QueueController } from './queue.controller';
import { OrderModule } from '../orders/order.module';

@Module({
  imports: [OrderModule],
  controllers: [QueueController],
  providers: [QueueService, OrderProducer, OrderConsumer, OrderHandler],
  exports: [QueueService, OrderProducer],
})
export class QueueModule {}
