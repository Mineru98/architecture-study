export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  ownerId: string;
}

export const seedProducts: Product[] = [
  {
    id: "prod-1",
    name: "노트북 Pro",
    category: "electronics",
    price: 1500000,
    ownerId: "user-seller-a",
  },
  {
    id: "prod-2",
    name: "무선 이어폰",
    category: "electronics",
    price: 89000,
    ownerId: "user-seller-a",
  },
  {
    id: "prod-3",
    name: "겨울 코트",
    category: "fashion",
    price: 250000,
    ownerId: "user-seller-b",
  },
];
