import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { GetProductsUseCase, GetProductUseCase, CreateProductUseCase, UpdateProductUseCase, DeleteProductUseCase } from '../../domain/usecases/product.usecases';
import { ProductEntity } from '../../domain/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly getProducts: GetProductsUseCase,
    private readonly getProduct: GetProductUseCase,
    private readonly createProduct: CreateProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    private readonly deleteProduct: DeleteProductUseCase,
  ) {}

  @Get() list(@Query('category') category?: string, @Query('page') page?: string) {
    return this.getProducts.execute(category, page ? +page : 1);
  }
  @Get(':id') detail(@Param('id') id: string) { return this.getProduct.execute(id); }
  @Post() create(@Body() body: Partial<ProductEntity>) { return this.createProduct.execute(body); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: Partial<ProductEntity>) { return this.updateProduct.execute(id, body); }
  @Delete(':id') remove(@Param('id') id: string) { return this.deleteProduct.execute(id); }
}
