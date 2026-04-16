import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../domain/product';
import { SAMPLE_PRODUCTS } from '../../seed';

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCT_REPO') private repo: Repository<any>) {}
  async seed() {
    const count = await this.repo.count();
    if (count === 0) { for (const p of SAMPLE_PRODUCTS) await this.repo.save(this.repo.create(p)); }
  }
  async findAll(category?: string, page = 1, limit = 10) {
    const qb = this.repo.createQueryBuilder('p');
    if (category && category !== '전체') qb.where('p.category = :category', { category });
    qb.skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }
  async findOne(id: string) { return this.repo.findOneBy({ id }); }
  async create(data: Partial<Product>) { return this.repo.save(this.repo.create({ ...data, id: data.id || uuidv4() })); }
  async update(id: string, data: Partial<Product>) { await this.repo.update(id, data); return this.repo.findOneBy({ id }); }
  async remove(id: string) { await this.repo.delete(id); return { deleted: true }; }
}
