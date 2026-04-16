import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { User } from './user.entity';
import { RedisModule } from './redis.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProductAppService } from './application/product.app-service';
import { OrderAppService } from './application/order.app-service';
import { ProductRepositoryImpl } from './infrastructure/repositories/product.repository.impl';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { IProductRepository } from './domain/product/product.repository';
import { IOrderRepository } from './domain/order/order.repository';
import { IUserRepository } from './domain/user/user.repository';
import { ProductsController } from './interfaces/controllers/product.controller';
import { OrdersController } from './interfaces/controllers/order.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({ type: 'postgres', host: 'localhost', port: 5432, username: 'study', password: 'study', database: 'design_methodology', synchronize: true, autoLoadEntities: true, logging: false }),
    TypeOrmModule.forFeature([Product, Order, User]),
    RedisModule, AuthModule,
  ],
  controllers: [ProductsController, OrdersController],
  providers: [
    { provide: 'IProductRepository', useClass: ProductRepositoryImpl },
    { provide: 'IOrderRepository', useClass: OrderRepositoryImpl },
    { provide: 'IUserRepository', useClass: UserRepositoryImpl },
    ProductAppService, OrderAppService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private auth: AuthService, private products: ProductAppService) {}
  async onModuleInit() {
    await this.auth.seed();
    await this.products.seed();
    console.log('Seed data loaded');
  }
}
