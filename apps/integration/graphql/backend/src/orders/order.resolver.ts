import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from '../common/entities';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order])
  async orders(@Args('userId', { nullable: true }) userId?: string): Promise<Order[]> {
    return this.ordersService.findAll(userId);
  }

  @Query(() => Order, { nullable: true })
  async order(@Args('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  async createOrder(
    @Args('userId') userId: string,
    @Args('items', { type: () => [String] }) items: string[],
    @Args('total') total: number,
  ): Promise<Order> {
    return this.ordersService.create(userId, items, total);
  }

  @Mutation(() => Order)
  async updateOrderStatus(
    @Args('id') id: string,
    @Args('status') status: string,
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, status);
  }
}
