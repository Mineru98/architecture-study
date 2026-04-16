import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './redis.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductService } from './modules/product/product.service';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({ type: 'postgres', host: 'localhost', port: 5432, username: 'study', password: 'study', database: 'design_methodology', synchronize: true, autoLoadEntities: true, logging: false }),
    RedisModule, ProductModule, OrderModule, UserModule, AuthModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private users: UserService, private products: ProductService) {}
  async onModuleInit() { await this.users.seed(); await this.products.seed(); console.log('Seed data loaded'); }
}
