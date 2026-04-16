import { Module } from '@nestjs/common';
import { RpcController } from './rpc.controller';
import { RpcService } from './rpc.service';
import { ProductModule } from '../products/product.module';
import { OrderModule } from '../orders/order.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ProductModule, OrderModule, AuthModule],
  controllers: [RpcController],
  providers: [RpcService],
})
export class RpcModule {}
