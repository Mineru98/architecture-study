import { Controller, Get, Post, Patch, Delete, Param, Query, Body, HttpCode, HttpStatus, NotFoundException, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import { Product } from '../common/entities';

@Controller('v1/products')
export class ProductController {
  constructor(private service: ProductService) {}

  @Get()
  async findAll(@Query('category') category?: string, @Query('page') page?: string) {
    const products = await this.service.findAll(category, page ? +page : 1);
    return { data: products, statusCode: HttpStatus.OK };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.service.findOne(id);
    if (!product) throw new NotFoundException({ error: 'Not Found', message: `Product ${id} not found`, statusCode: 404 });
    return { data: product, statusCode: HttpStatus.OK };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: Partial<Product>) {
    const product = await this.service.create(data);
    return { data: product, statusCode: HttpStatus.CREATED };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Product>) {
    const product = await this.service.update(id, data);
    if (!product) throw new NotFoundException({ error: 'Not Found', message: `Product ${id} not found`, statusCode: 404 });
    return { data: product, statusCode: HttpStatus.OK };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
  }
}
