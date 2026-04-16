import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../product.entity';
@Injectable()
export class DeleteProductHandler {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}
  async execute(id: string) { await this.repo.delete(id); return { deleted: true }; }
}
