export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  imageUrl: string;
}

export interface ProductData {
  product: Product | null;
}
