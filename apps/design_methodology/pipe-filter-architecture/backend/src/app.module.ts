import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { User } from './user.entity';
import { RedisModule } from './redis.module';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { PipelineRunner } from './pipeline/pipeline-runner';
import { ValidateProductFilter, EnrichProductFilter, TransformProductFilter } from './filters/product-filters';
import { ProductsController } from './products.controller';
import { OrdersController } from './orders.controller';
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
  providers: [ProductService, OrderService, PipelineRunner, ValidateProductFilter, EnrichProductFilter, TransformProductFilter, AuthService],
})
export class AppModule implements OnModuleInit {
  constructor(private products: ProductService, private auth: AuthService) {}
  async onModuleInit() { await this.auth.seed(); await this.products.seed(); console.log('Seed data loaded'); }
}
