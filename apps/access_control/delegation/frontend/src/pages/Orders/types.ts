export interface Order {
  id: string;
  userId: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  status: string;
  createdAt: string;
}
