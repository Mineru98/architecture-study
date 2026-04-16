import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../../entities';
import { IProductRepository } from '../interfaces/product-repository.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TypeOrmProductRepository implements IProductRepository {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async findAll(category?: string, page = 1, limit = 10): Promise<Product[]> {
    const qb = this.repo.createQueryBuilder('p');
    if (category) qb.where('p.category = :category', { category });
    return qb.skip((page - 1) * limit).take(limit).getMany();
  }

  async findById(id: string): Promise<Product | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<Product>): Promise<Product> {
    const product = this.repo.create({ ...data, id: uuidv4() });
    return this.repo.save(product);
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
