import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities';
import { OrderController } from './order.controller';
import { OrderCommandService } from './commands/order-command.service';
import { OrderQueryService } from './queries/order-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderCommandService, OrderQueryService],
})
export class OrderModule {}
