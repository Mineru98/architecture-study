import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../common/entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepo.findOne({ where: { id } });
  }

  async create(input: Partial<Product>): Promise<Product> {
    const product = this.productRepo.create(input);
    return this.productRepo.save(product);
  }

  async update(id: string, input: Partial<Product>): Promise<Product> {
    await this.productRepo.update(id, input);
    return this.productRepo.findOne({ where: { id } });
  }
}
