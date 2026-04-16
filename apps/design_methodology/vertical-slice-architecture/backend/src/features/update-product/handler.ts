import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../product.entity';
@Injectable()
export class UpdateProductHandler {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}
  async execute(id: string, data: Partial<Product>) {
    await this.repo.update(id, data);
    return this.repo.findOneBy({ id });
  }
}
