import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './product.entity';
import { SAMPLE_PRODUCTS } from './seed';
import { PipelineRunner } from './pipeline/pipeline-runner';
import { ValidateProductFilter, EnrichProductFilter, TransformProductFilter } from './filters/product-filters';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    private pipeline: PipelineRunner,
    private validateFilter: ValidateProductFilter,
    private enrichFilter: EnrichProductFilter,
    private transformFilter: TransformProductFilter,
  ) {}

  async seed() { const c = await this.repo.count(); if (c === 0) { for (const p of SAMPLE_PRODUCTS) await this.repo.save(this.repo.create(p)); } }
  async findAll(category?: string, page = 1, limit = 10) {
    const qb = this.repo.createQueryBuilder('p');
    if (category && category !== '전체') qb.where('p.category = :category', { category });
    qb.skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }
  async findOne(id: string) { return this.repo.findOneBy({ id }); }
  async create(data: Partial<Product>) {
    const processed = await this.pipeline.run(data, [this.validateFilter, this.enrichFilter, this.transformFilter]);
    return this.repo.save(this.repo.create({ ...processed, id: data.id || uuidv4() }));
  }
  async update(id: string, data: Partial<Product>) {
    const processed = await this.pipeline.run(data, [this.validateFilter, this.enrichFilter, this.transformFilter]);
    await this.repo.update(id, processed);
    return this.repo.findOneBy({ id });
  }
  async remove(id: string) { await this.repo.delete(id); return { deleted: true }; }
}
