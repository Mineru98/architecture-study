import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { User } from './user.entity';
import { RedisModule } from './redis.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProductRepositoryImpl } from './adapters/repositories/product.repository';
import { OrderRepositoryImpl } from './adapters/repositories/order.repository';
import { UserRepositoryImpl } from './adapters/repositories/user.repository';
import { IProductRepository } from './domain/repositories/product.repository.interface';
import { IOrderRepository } from './domain/repositories/order.repository.interface';
import { IUserRepository } from './domain/repositories/user.repository.interface';
import { GetProductsUseCase, GetProductUseCase, CreateProductUseCase, UpdateProductUseCase, DeleteProductUseCase } from './domain/usecases/product.usecases';
import { GetOrdersUseCase, GetOrderUseCase, CreateOrderUseCase, UpdateOrderStatusUseCase } from './domain/usecases/order.usecases';
import { ProductsController } from './adapters/controllers/product.controller';
import { OrdersController } from './adapters/controllers/order.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', host: 'localhost', port: 5432,
      username: 'study', password: 'study', database: 'design_methodology',
      synchronize: true, autoLoadEntities: true, logging: false,
    }),
    TypeOrmModule.forFeature([Product, Order, User]),
    RedisModule,
    AuthModule,
  ],
  controllers: [ProductsController, OrdersController],
  providers: [
    { provide: 'IProductRepository', useClass: ProductRepositoryImpl },
    { provide: 'IOrderRepository', useClass: OrderRepositoryImpl },
    { provide: 'IUserRepository', useClass: UserRepositoryImpl },
    GetProductsUseCase, GetProductUseCase, CreateProductUseCase, UpdateProductUseCase, DeleteProductUseCase,
    GetOrdersUseCase, GetOrderUseCase, CreateOrderUseCase, UpdateOrderStatusUseCase,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly auth: AuthService) {}
  async onModuleInit() {
    await this.auth.seed();
    console.log('Seed data loaded');
  }
}
