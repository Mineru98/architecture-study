export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  imageUrl: string;
}

export interface ProductListData {
  products: Product[];
}
