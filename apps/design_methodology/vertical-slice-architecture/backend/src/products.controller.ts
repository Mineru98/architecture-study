import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { GetProductsHandler } from './features/get-products/handler';
import { GetProductHandler } from './features/get-product/handler';
import { CreateProductHandler } from './features/create-product/handler';
import { UpdateProductHandler } from './features/update-product/handler';
import { DeleteProductHandler } from './features/delete-product/handler';
import { CreateProductDto } from './features/create-product/dto';
@Controller('products')
export class ProductsController {
  constructor(
    private getProducts: GetProductsHandler,
    private getProduct: GetProductHandler,
    private createProduct: CreateProductHandler,
    private updateProduct: UpdateProductHandler,
    private deleteProduct: DeleteProductHandler,
  ) {}
  @Get() list(@Query('category') category?: string, @Query('page') page?: string) { return this.getProducts.execute(category, page ? +page : 1); }
  @Get(':id') detail(@Param('id') id: string) { return this.getProduct.execute(id); }
  @Post() create(@Body() dto: CreateProductDto) { return this.createProduct.execute(dto); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.updateProduct.execute(id, body); }
  @Delete(':id') remove(@Param('id') id: string) { return this.deleteProduct.execute(id); }
}
