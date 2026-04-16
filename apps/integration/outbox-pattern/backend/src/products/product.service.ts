import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../common/entities';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async findAll(category?: string, page = 1, limit = 10) {
    const qb = this.repo.createQueryBuilder('p');
    if (category) qb.where('p.category = :category', { category });
    return qb.skip((page - 1) * limit).take(limit).getMany();
  }

  async findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
