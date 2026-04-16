import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, Order, User } from './entities';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedService } from './seed';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'study',
      password: 'study',
      database: 'implementation',
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([Product, Order, User]),
    ProductModule,
    OrderModule,
    AuthModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
