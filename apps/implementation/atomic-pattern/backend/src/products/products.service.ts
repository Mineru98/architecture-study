import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { SEED_PRODUCTS } from '../seed';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async onModuleInit() {
    const count = await this.productRepo.count();
    if (count === 0) {
      for (const seed of SEED_PRODUCTS) {
        await this.productRepo.save(this.productRepo.create(seed));
      }
    }
  }

  findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  findOne(id: string): Promise<Product> {
    return this.productRepo.findOneByOrFail({ id });
  }

  create(data: Partial<Product>): Promise<Product> {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }
}
