import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from '../common/entities';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { nullable: true })
  async product(@Args('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('price') price: number,
    @Args('stock') stock: number,
    @Args('category') category: string,
    @Args('imageUrl', { defaultValue: '' }) imageUrl: string,
  ): Promise<Product> {
    return this.productsService.create({ name, description, price, stock, category, imageUrl });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('price', { nullable: true }) price?: number,
    @Args('stock', { nullable: true }) stock?: number,
    @Args('category', { nullable: true }) category?: string,
  ): Promise<Product> {
    return this.productsService.update(id, { name, description, price, stock, category });
  }
}
