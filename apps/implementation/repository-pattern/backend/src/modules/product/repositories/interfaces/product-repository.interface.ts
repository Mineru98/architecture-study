import { Product } from '../../../../entities';

export interface IProductRepository {
  findAll(category?: string, page?: number, limit?: number): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(data: Partial<Product>): Promise<Product>;
  update(id: string, data: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<void>;
}
