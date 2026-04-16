import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../common/product.entity';

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
  @UseGuards() // Guard applied per pattern via access-control module
  create(@Body() body: Partial<Product>) {
    return this.service.create(body);
  }

  @Patch(':id')
  @UseGuards() // Guard applied per pattern
  update(@Param('id') id: string, @Body() body: Partial<Product>) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards() // Guard applied per pattern
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
