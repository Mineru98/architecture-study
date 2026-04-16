import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { Product, Order, User } from './common/entities';
import { RedisModule } from './common/redis.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
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
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    RedisModule,
    TypeOrmModule.forFeature([Product, Order, User]),
    ProductsModule,
    OrdersModule,
    AuthModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
