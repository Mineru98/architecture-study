import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../entities';

@Injectable()
export class ProductQueryService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  // Query: List products (read side - optimized for reads)
  async getProducts(category?: string, page = 1, limit = 10): Promise<Product[]> {
    const qb = this.repo.createQueryBuilder('p').select(['p.id', 'p.name', 'p.price', 'p.category', 'p.imageUrl']);
    if (category) qb.where('p.category = :category', { category });
    return qb.skip((page - 1) * limit).take(limit).getMany();
  }

  // Query: Get single product detail (read side)
  async getProduct(id: string): Promise<Product> {
    return this.repo.findOne({ where: { id } });
  }
}
