import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './common/redis.module';
import { AccessControlModule } from './access-control/access-control.module';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'study',
      password: 'study',
      database: 'access_control',
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
    }),
    RedisModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    AuthModule,
    AccessControlModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly products: ProductsService,
    private readonly users: UsersService,
  ) {}

  async onModuleInit() {
    await this.users.seed();
    await this.products.seed();
    console.log('Seed data loaded');
  }
}
