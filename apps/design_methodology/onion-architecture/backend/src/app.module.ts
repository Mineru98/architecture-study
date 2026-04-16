import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { User } from './user.entity';
import { RedisModule } from './redis.module';
import { AuthModule } from './auth/auth.module';
import { ProductsService } from './core/application/products.service';
import { OrdersService } from './core/application/orders.service';
import { UsersService } from './core/application/users.service';
import { ProductsController } from './api/controllers/products.controller';
import { OrdersController } from './api/controllers/orders.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({ type: 'postgres', host: 'localhost', port: 5432, username: 'study', password: 'study', database: 'design_methodology', synchronize: true, autoLoadEntities: true, logging: false }),
    TypeOrmModule.forFeature([Product, Order, User]),
    RedisModule, AuthModule,
  ],
  controllers: [ProductsController, OrdersController],
  providers: [
    { provide: 'PRODUCT_REPO', useExisting: getRepositoryToken(Product) },
    { provide: 'ORDER_REPO', useExisting: getRepositoryToken(Order) },
    { provide: 'USER_REPO', useExisting: getRepositoryToken(User) },
    ProductsService, OrdersService, UsersService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private users: UsersService, private products: ProductsService) {}
  async onModuleInit() { await this.users.seed(); await this.products.seed(); console.log('Seed data loaded'); }
}
