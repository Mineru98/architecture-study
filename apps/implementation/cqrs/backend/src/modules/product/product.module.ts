import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities';
import { ProductController } from './product.controller';
import { ProductCommandService } from './commands/product-command.service';
import { ProductQueryService } from './queries/product-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductCommandService, ProductQueryService],
})
export class ProductModule {}
