import { ProductDomain } from '../../domain/product';
export interface IProductUseCase {
  getProducts(category?: string, page?: number): Promise<{ items: ProductDomain[]; total: number }>;
  getProduct(id: string): Promise<ProductDomain | null>;
  createProduct(data: Partial<ProductDomain>): Promise<ProductDomain>;
  updateProduct(id: string, data: Partial<ProductDomain>): Promise<ProductDomain | null>;
  deleteProduct(id: string): Promise<void>;
  seed(): Promise<void>;
}
