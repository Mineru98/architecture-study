import { Injectable } from '@nestjs/common';
import { Product } from '../../../../entities';
import { IProductRepository } from '../interfaces/product-repository.interface';
import { v4 as uuidv4 } from 'uuid';

// In-memory implementation - demonstrates swapping implementations
@Injectable()
export class InMemoryProductRepository implements IProductRepository {
  private products: Map<string, Product> = new Map();

  async findAll(category?: string, page = 1, limit = 10): Promise<Product[]> {
    let items = Array.from(this.products.values());
    if (category) items = items.filter((p) => p.category === category);
    return items.slice((page - 1) * limit, page * limit);
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.get(id) || null;
  }

  async create(data: Partial<Product>): Promise<Product> {
    const product = { ...data, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() } as Product;
    this.products.set(product.id, product);
    return product;
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    const existing = this.products.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...data, updatedAt: new Date() };
    this.products.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.products.delete(id);
  }
}
