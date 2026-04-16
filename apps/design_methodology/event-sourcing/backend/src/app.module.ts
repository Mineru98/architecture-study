import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { User } from './user.entity';
import { RedisModule } from './redis.module';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { OrdersController } from './orders.controller';
import { OrderCommandHandler } from './commands/order.commands';
import { OrderProjection } from './projections/order.projection';
import { EventStoreService } from './event-store/event-store.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({ type: 'postgres', host: 'localhost', port: 5432, username: 'study', password: 'study', database: 'design_methodology', synchronize: true, autoLoadEntities: true, logging: false }),
    TypeOrmModule.forFeature([Product, Order, User]),
    RedisModule,
    JwtModule.register({ secret: 'design-methodology-secret', signOptions: { expiresIn: '24h' } }),
  ],
  controllers: [ProductsController, OrdersController, AuthController],
  providers: [ProductsService, OrderCommandHandler, OrderProjection, EventStoreService, AuthService],
})
export class AppModule implements OnModuleInit {
  constructor(private products: ProductsService, private auth: AuthService) {}
  async onModuleInit() { await this.auth.seed(); await this.products.seed(); console.log('Seed data loaded'); }
}
