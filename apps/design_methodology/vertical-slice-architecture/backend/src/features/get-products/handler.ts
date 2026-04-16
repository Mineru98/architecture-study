import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../product.entity';
@Injectable()
export class GetProductsHandler {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}
  async execute(category?: string, page = 1, limit = 10) {
    const qb = this.repo.createQueryBuilder('p');
    if (category && category !== '전체') qb.where('p.category = :category', { category });
    qb.skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }
}
