import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { User } from './user.entity';
import { RedisModule } from './redis.module';
import { ProductsController } from './products.controller';
import { OrdersController } from './orders.controller';
import { AuthController } from './auth.controller';
import { GetProductsHandler } from './features/get-products/handler';
import { GetProductHandler } from './features/get-product/handler';
import { CreateProductHandler } from './features/create-product/handler';
import { UpdateProductHandler } from './features/update-product/handler';
import { DeleteProductHandler } from './features/delete-product/handler';
import { GetOrdersHandler } from './features/get-orders/handler';
import { GetOrderHandler } from './features/get-order/handler';
import { CreateOrderHandler } from './features/create-order/handler';
import { UpdateOrderStatusHandler } from './features/update-order-status/handler';
import { LoginHandler } from './features/login/handler';
import { MeHandler } from './features/me/handler';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({ type: 'postgres', host: 'localhost', port: 5432, username: 'study', password: 'study', database: 'design_methodology', synchronize: true, autoLoadEntities: true, logging: false }),
    TypeOrmModule.forFeature([Product, Order, User]),
    RedisModule,
    JwtModule.register({ secret: 'design-methodology-secret', signOptions: { expiresIn: '24h' } }),
  ],
  controllers: [ProductsController, OrdersController, AuthController],
  providers: [
    GetProductsHandler, GetProductHandler, CreateProductHandler, UpdateProductHandler, DeleteProductHandler,
    GetOrdersHandler, GetOrderHandler, CreateOrderHandler, UpdateOrderStatusHandler,
    LoginHandler, MeHandler, SeedService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private seed: SeedService) {}
  async onModuleInit() { await this.seed.seed(); console.log('Seed data loaded'); }
}
