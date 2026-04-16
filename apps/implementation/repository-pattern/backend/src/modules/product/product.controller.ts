import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../entities';

@Controller('products')
export class ProductController {
  constructor(private service: ProductService) {}

  @Get() findAll(@Query('category') category?: string, @Query('page') page?: string) { return this.service.findAll(category, page ? +page : 1); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Post() create(@Body() data: Partial<Product>) { return this.service.create(data); }
  @Patch(':id') update(@Param('id') id: string, @Body() data: Partial<Product>) { return this.service.update(id, data); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
