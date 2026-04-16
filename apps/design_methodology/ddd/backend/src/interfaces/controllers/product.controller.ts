import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { ProductAppService } from '../../application/product.app-service';

@Controller('products')
export class ProductsController {
  constructor(private readonly app: ProductAppService) {}
  @Get() list(@Query('category') category?: string, @Query('page') page?: string) { return this.app.getProducts(category, page ? +page : 1); }
  @Get(':id') detail(@Param('id') id: string) { return this.app.getProduct(id); }
  @Post() create(@Body() body: any) { return this.app.createProduct(body); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.app.updateProduct(id, body); }
  @Delete(':id') remove(@Param('id') id: string) { return this.app.deleteProduct(id); }
}
