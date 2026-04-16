import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../repositories/product.repository.interface';
import { ProductEntity } from '../entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GetProductsUseCase {
  constructor(@Inject('IProductRepository') private repo: IProductRepository) {}
  execute(category?: string, page = 1) { return this.repo.findAll(category, page); }
}

@Injectable()
export class GetProductUseCase {
  constructor(@Inject('IProductRepository') private repo: IProductRepository) {}
  execute(id: string) { return this.repo.findOne(id); }
}

@Injectable()
export class CreateProductUseCase {
  constructor(@Inject('IProductRepository') private repo: IProductRepository) {}
  execute(data: Partial<ProductEntity>) { return this.repo.create({ ...data, id: data.id || uuidv4() }); }
}

@Injectable()
export class UpdateProductUseCase {
  constructor(@Inject('IProductRepository') private repo: IProductRepository) {}
  execute(id: string, data: Partial<ProductEntity>) { return this.repo.update(id, data); }
}

@Injectable()
export class DeleteProductUseCase {
  constructor(@Inject('IProductRepository') private repo: IProductRepository) {}
  execute(id: string) { return this.repo.delete(id); }
}
