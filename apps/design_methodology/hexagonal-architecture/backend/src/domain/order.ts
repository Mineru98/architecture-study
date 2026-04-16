export interface OrderItem { productId: string; name: string; price: number; quantity: number; }
export class OrderDomain {
  id: string; userId: string; items: OrderItem[]; total: number; status: string; createdAt: Date;
}
