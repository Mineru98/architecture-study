import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';
import { SAMPLE_PRODUCTS, SAMPLE_USERS } from './seed';
@Injectable()
export class SeedService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>, @InjectRepository(User) private userRepo: Repository<User>) {}
  async seed() {
    const pc = await this.productRepo.count();
    if (pc === 0) { for (const p of SAMPLE_PRODUCTS) await this.productRepo.save(this.productRepo.create(p)); }
    const uc = await this.userRepo.count();
    if (uc === 0) { for (const u of SAMPLE_USERS) await this.userRepo.save(this.userRepo.create(u)); }
  }
}
