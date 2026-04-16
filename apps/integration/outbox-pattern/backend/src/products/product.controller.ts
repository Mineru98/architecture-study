import { Controller, Get, Param, Query, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('v1/products')
export class ProductController {
  constructor(private service: ProductService) {}

  @Get()
  async findAll(@Query('category') category?: string) {
    const products = await this.service.findAll(category);
    return { data: products, statusCode: HttpStatus.OK };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.service.findOne(id);
    return { data: product, statusCode: HttpStatus.OK };
  }
}
