import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { IOrderRepository } from './repositories/interfaces/order-repository.interface';
import { TypeOrmOrderRepository } from './repositories/implementations/typeorm-order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    { provide: 'IOrderRepository', useClass: TypeOrmOrderRepository },
    OrderService,
  ],
})
export class OrderModule {}
