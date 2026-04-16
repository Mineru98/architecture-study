import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { User } from './user.entity';
import { RedisModule } from './redis.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProductsService } from './application/services/products.service';
import { UsersService } from './application/services/users.service';
import { OrdersService } from './application/services/orders.service';
import { ProductsController } from './presentation/controllers/products.controller';
import { OrdersController } from './presentation/controllers/orders.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({ type: 'postgres', host: 'localhost', port: 5432, username: 'study', password: 'study', database: 'design_methodology', synchronize: true, autoLoadEntities: true, logging: false }),
    TypeOrmModule.forFeature([Product, Order]),
    RedisModule, AuthModule,
  ],
  controllers: [ProductsController, OrdersController],
  providers: [ProductsService, OrdersService, UsersService],
})
export class AppModule implements OnModuleInit {
  constructor(private users: UsersService, private products: ProductsService) {}
  async onModuleInit() { await this.users.seed(); await this.products.seed(); console.log('Seed data loaded'); }
}
