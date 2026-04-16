import { ProductEntity } from '../entities/product.entity';
export interface IProductRepository {
  findAll(category?: string, page?: number, limit?: number): Promise<{ items: ProductEntity[]; total: number }>;
  findOne(id: string): Promise<ProductEntity | null>;
  create(data: Partial<ProductEntity>): Promise<ProductEntity>;
  update(id: string, data: Partial<ProductEntity>): Promise<ProductEntity | null>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
