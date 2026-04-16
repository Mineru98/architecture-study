import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  findAll(@Query('category') category?: string, @Query('page') page?: string) {
    return this.service.findAll(category, page ? +page : 1);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Product>) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Product>) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
