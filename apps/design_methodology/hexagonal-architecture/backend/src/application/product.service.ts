import { Injectable, Inject } from '@nestjs/common';
import { IProductUseCase } from '../ports/in/product.usecase';
import { IProductRepository } from '../ports/out/product.repository';
import { ProductDomain } from '../domain/product';
import { v4 as uuidv4 } from 'uuid';
import { SAMPLE_PRODUCTS } from '../seed';

@Injectable()
export class ProductService implements IProductUseCase {
  constructor(@Inject('IProductRepository') private repo: IProductRepository) {}
  getProducts(category?: string, page = 1) { return this.repo.findAll(category, page); }
  getProduct(id: string) { return this.repo.findOne(id); }
  createProduct(data: Partial<ProductDomain>) { return this.repo.save({ ...data, id: data.id || uuidv4() }); }
  updateProduct(id: string, data: Partial<ProductDomain>) { return this.repo.update(id, data); }
  deleteProduct(id: string) { return this.repo.delete(id); }
  async seed() {
    const count = await this.repo.count();
    if (count === 0) { for (const p of SAMPLE_PRODUCTS) await this.repo.save(p as any); }
  }
}
