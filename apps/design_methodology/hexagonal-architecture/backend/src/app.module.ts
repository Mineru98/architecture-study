import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { User } from './user.entity';
import { RedisModule } from './redis.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProductService } from './application/product.service';
import { OrderService } from './application/order.service';
import { ProductRepositoryAdapter } from './adapters/out/repositories/product.repository.adapter';
import { OrderRepositoryAdapter } from './adapters/out/repositories/order.repository.adapter';
import { UserRepositoryAdapter } from './adapters/out/repositories/user.repository.adapter';
import { IProductUseCase } from './ports/in/product.usecase';
import { IOrderUseCase } from './ports/in/order.usecase';
import { IProductRepository } from './ports/out/product.repository';
import { IOrderRepository } from './ports/out/order.repository';
import { IUserRepository } from './ports/out/user.repository';
import { ProductsController } from './adapters/in/controllers/product.controller';
import { OrdersController } from './adapters/in/controllers/order.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({ type: 'postgres', host: 'localhost', port: 5432, username: 'study', password: 'study', database: 'design_methodology', synchronize: true, autoLoadEntities: true, logging: false }),
    TypeOrmModule.forFeature([Product, Order, User]),
    RedisModule, AuthModule,
  ],
  controllers: [ProductsController, OrdersController],
  providers: [
    { provide: 'IProductRepository', useClass: ProductRepositoryAdapter },
    { provide: 'IOrderRepository', useClass: OrderRepositoryAdapter },
    { provide: 'IUserRepository', useClass: UserRepositoryAdapter },
    { provide: 'IProductUseCase', useClass: ProductService },
    { provide: 'IOrderUseCase', useClass: OrderService },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private auth: AuthService, @Inject('IProductUseCase') private products: IProductUseCase) {}
  async onModuleInit() { await this.auth.seed(); await this.products.seed(); console.log('Seed data loaded'); }
}
