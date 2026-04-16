import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../product.entity';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
  constructor(@InjectRepository(Product) private readonly repo: Repository<Product>) {}

  async findAll(category?: string, page = 1, limit = 10) {
    const qb = this.repo.createQueryBuilder('p');
    if (category && category !== '전체') qb.where('p.category = :category', { category });
    qb.skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items: items as unknown as ProductEntity[], total };
  }

  async findOne(id: string) { return this.repo.findOneBy({ id }) as unknown as Promise<ProductEntity | null>; }
  async create(data: Partial<ProductEntity>) { return this.repo.save(this.repo.create(data)) as unknown as Promise<ProductEntity>; }
  async update(id: string, data: Partial<ProductEntity>) { await this.repo.update(id, data); return this.repo.findOneBy({ id }) as unknown as Promise<ProductEntity | null>; }
  async delete(id: string) { await this.repo.delete(id); }
  async count() { return this.repo.count(); }
}
