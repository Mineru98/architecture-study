import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../domain/product/product.repository';
import { ProductEntity } from '../domain/product/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { SAMPLE_PRODUCTS } from '../seed';

@Injectable()
export class ProductAppService {
  constructor(@Inject('IProductRepository') private repo: IProductRepository) {}

  async seed() {
    const count = await this.repo.count();
    if (count === 0) { for (const p of SAMPLE_PRODUCTS) await this.repo.save({ ...p } as ProductEntity); }
  }

  getProducts(category?: string, page = 1) { return this.repo.findAll(category, page); }
  getProduct(id: string) { return this.repo.findOne(id); }
  createProduct(data: Partial<ProductEntity>) { return this.repo.save({ ...data, id: data.id || uuidv4() } as ProductEntity); }
  updateProduct(id: string, data: Partial<ProductEntity>) { return this.repo.update(id, data); }
  deleteProduct(id: string) { return this.repo.delete(id); }
}
