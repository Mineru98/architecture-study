/**
 * 상품 서비스
 */

import { productStore, type Product } from "./product.entity.js";

export class ProductService {
  findAll(): Product[] {
    return productStore.findAll();
  }

  findById(id: string): Product | undefined {
    return productStore.findById(id);
  }

  update(id: string, data: Partial<Product>): Product | undefined {
    return productStore.update(id, data);
  }
}