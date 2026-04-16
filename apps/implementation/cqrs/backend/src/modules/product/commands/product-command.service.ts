import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../entities';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductCommandService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  // Command: Create product (write side)
  async createProduct(data: Partial<Product>): Promise<Product> {
    const product = this.repo.create({ ...data, id: uuidv4() });
    return this.repo.save(product);
  }

  // Command: Update product (write side)
  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }

  // Command: Delete product (write side)
  async deleteProduct(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
