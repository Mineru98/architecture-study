import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './common/redis.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'study',
      password: 'study',
      database: 'implementation',
      entities: [Product, Order, User],
      synchronize: true,
    }),
    RedisModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
  ],
})
export class AppModule {}
