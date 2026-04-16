import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../product.entity';
@Injectable()
export class CreateProductHandler {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}
  async execute(data: Partial<Product>) {
    return this.repo.save(this.repo.create({ ...data, id: data.id || uuidv4() }));
  }
}
