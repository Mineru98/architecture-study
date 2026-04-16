import { Controller, Get, Post, Patch, Delete, Param, Query, Body, Inject } from '@nestjs/common';
import { IProductUseCase } from '../../../ports/in/product.usecase';
@Controller('products')
export class ProductsController {
  constructor(@Inject('IProductUseCase') private useCase: IProductUseCase) {}
  @Get() list(@Query('category') category?: string, @Query('page') page?: string) { return this.useCase.getProducts(category, page ? +page : 1); }
  @Get(':id') detail(@Param('id') id: string) { return this.useCase.getProduct(id); }
  @Post() create(@Body() body: any) { return this.useCase.createProduct(body); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.useCase.updateProduct(id, body); }
  @Delete(':id') remove(@Param('id') id: string) { return this.useCase.deleteProduct(id); }
}
