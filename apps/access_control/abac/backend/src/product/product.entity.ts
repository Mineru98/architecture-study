/**
 * 상품 엔티티
 * 인메모리 스토어 사용
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  sellerId: string;  // 소유자 (판매자 ID)
  createdAt: Date;
  updatedAt: Date;
}

// 인메모리 상품 스토어
const products: Product[] = [
  { id: "prod-1", name: "노트북", price: 1500000, sellerId: "user-2", createdAt: new Date("2026-01-10"), updatedAt: new Date("2026-01-10") },
  { id: "prod-2", name: "마우스", price: 30000, sellerId: "user-2", createdAt: new Date("2026-01-11"), updatedAt: new Date("2026-01-11") },
  { id: "prod-3", name: "키보드", price: 80000, sellerId: "user-3", createdAt: new Date("2026-01-12"), updatedAt: new Date("2026-01-12") },
  { id: "prod-4", name: "모니터", price: 400000, sellerId: "user-3", createdAt: new Date("2026-01-13"), updatedAt: new Date("2026-01-13") },
];

export const productStore = {
  findAll: () => [...products],
  findById: (id: string) => products.find(p => p.id === id),
  update: (id: string, data: Partial<Product>) => {
    const idx = products.findIndex(p => p.id === id);
    if (idx >= 0) {
      products[idx] = { ...products[idx], ...data, updatedAt: new Date() };
      return products[idx];
    }
    return undefined;
  },
};