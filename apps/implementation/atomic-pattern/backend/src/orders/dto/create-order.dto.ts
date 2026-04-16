export class CreateOrderDto {
  items: Array<{
    productId: string;
    name?: string;
    price?: number;
    quantity: number;
  }>;
}
