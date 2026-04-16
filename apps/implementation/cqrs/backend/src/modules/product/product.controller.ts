import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { ProductCommandService } from './commands/product-command.service';
import { ProductQueryService } from './queries/product-query.service';
import { Product } from '../../entities';

@Controller('products')
export class ProductController {
  constructor(
    private commandService: ProductCommandService,
    private queryService: ProductQueryService,
  ) {}

  // Query endpoints
  @Get()
  findAll(@Query('category') category?: string, @Query('page') page?: string) {
    return this.queryService.getProducts(category, page ? +page : 1);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryService.getProduct(id);
  }

  // Command endpoints
  @Post()
  create(@Body() data: Partial<Product>) {
    return this.commandService.createProduct(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Product>) {
    return this.commandService.updateProduct(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandService.deleteProduct(id);
  }
}
