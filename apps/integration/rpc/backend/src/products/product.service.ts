import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../common/entities';
import { v4 as uuidv4 } from 'uuid';

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

  async create(data: Partial<Product>) {
    const product = this.repo.create({ ...data, id: uuidv4() });
    return this.repo.save(product);
  }
}
