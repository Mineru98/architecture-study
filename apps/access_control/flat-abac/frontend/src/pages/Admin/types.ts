export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  status: string;
  createdAt: string;
}
