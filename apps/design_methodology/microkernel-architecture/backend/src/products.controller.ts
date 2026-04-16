import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { ProductService } from './core/product.service';
@Controller('products')
export class ProductsController {
  constructor(private service: ProductService) {}
  @Get() findAll(@Query('category') category?: string, @Query('page') page?: string) { return this.service.findAll(category, page ? +page : 1); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post() create(@Body() body: any) { return this.service.create(body); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.service.update(id, body); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
