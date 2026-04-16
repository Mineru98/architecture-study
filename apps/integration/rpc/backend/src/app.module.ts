import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, Order, User } from './common/entities';
import { RedisModule } from './common/redis.module';
import { ProductModule } from './products/product.module';
import { OrderModule } from './orders/order.module';
import { AuthModule } from './auth/auth.module';
import { RpcModule } from './rpc/rpc.module';
import { SeedService } from './seed';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'study',
      password: 'study',
      database: 'integration',
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
    }),
    RedisModule,
    TypeOrmModule.forFeature([Product, Order, User]),
    ProductModule,
    OrderModule,
    AuthModule,
    RpcModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
