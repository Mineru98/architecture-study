export interface OrderItem { productId: string; name: string; price: number; quantity: number; }
export class Order { id: string; userId: string; items: OrderItem[]; total: number; status: string; }
