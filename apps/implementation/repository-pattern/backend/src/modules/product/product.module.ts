import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { IProductRepository } from './repositories/interfaces/product-repository.interface';
import { TypeOrmProductRepository } from './repositories/implementations/typeorm-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    // Bind interface to TypeORM implementation (swap to InMemoryProductRepository for testing)
    { provide: 'IProductRepository', useClass: TypeOrmProductRepository },
    ProductService,
  ],
})
export class ProductModule {}
