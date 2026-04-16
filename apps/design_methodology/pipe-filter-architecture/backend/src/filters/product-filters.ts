import { Injectable } from '@nestjs/common';
import { Product } from '../product.entity';

export interface Filter<T> { execute(data: T): Promise<T>; }

@Injectable()
export class ValidateProductFilter implements Filter<Partial<Product>> {
  async execute(data: Partial<Product>) {
    if (!data.name) throw new Error('Product name is required');
    if (data.price !== undefined && data.price < 0) throw new Error('Price cannot be negative');
    return data;
  }
}

@Injectable()
export class EnrichProductFilter implements Filter<Partial<Product>> {
  async execute(data: Partial<Product>) {
    if (!data.imageUrl) data.imageUrl = '';
    if (!data.description) data.description = data.name || '';
    return data;
  }
}

@Injectable()
export class TransformProductFilter implements Filter<Partial<Product>> {
  async execute(data: Partial<Product>) {
    if (data.name) data.name = data.name.trim();
    if (data.category) data.category = data.category.trim();
    return data;
  }
}
