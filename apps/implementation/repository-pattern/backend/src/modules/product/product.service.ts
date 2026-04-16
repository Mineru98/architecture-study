import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from './repositories/interfaces/product-repository.interface';
import { Product } from '../../entities';

@Injectable()
export class ProductService {
  constructor(@Inject('IProductRepository') private repo: IProductRepository) {}

  async findAll(category?: string, page?: number) { return this.repo.findAll(category, page); }
  async findOne(id: string) { return this.repo.findById(id); }
  async create(data: Partial<Product>) { return this.repo.create(data); }
  async update(id: string, data: Partial<Product>) { return this.repo.update(id, data); }
  async remove(id: string) { return this.repo.delete(id); }
}
