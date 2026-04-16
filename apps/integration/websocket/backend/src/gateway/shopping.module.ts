import { Module } from '@nestjs/common';
import { ShoppingGateway } from './shopping.gateway';
import { ProductModule } from '../products/product.module';
import { OrderModule } from '../orders/order.module';

@Module({
  imports: [ProductModule, OrderModule],
  providers: [ShoppingGateway],
})
export class ShoppingGatewayModule {}
