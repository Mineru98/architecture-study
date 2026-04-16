import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, User } from '../entities';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async onModuleInit() {
    if (await this.productRepo.count() > 0) return;
    await this.productRepo.save([
      { id: 'p1', name: '무선 이어폰', price: 89000, stock: 50, category: '전자제품', description: '고품질 블루투스 이어폰', imageUrl: '' },
      { id: 'p2', name: '런닝화', price: 120000, stock: 30, category: '의류', description: '가벼운 런닝화', imageUrl: '' },
      { id: 'p3', name: '커피 원두', price: 25000, stock: 100, category: '식품', description: '에티오피아 원두', imageUrl: '' },
      { id: 'p4', name: '코딩 책', price: 35000, stock: 40, category: '도서', description: '클린 코드', imageUrl: '' },
      { id: 'p5', name: '텀블러', price: 18000, stock: 60, category: '생활', description: '스테인리스 텀블러', imageUrl: '' },
    ]);
    await this.userRepo.save([
      { id: 'u1', email: 'customer@test.com', name: '김고객', role: 'customer', password: '1234' },
      { id: 'u2', email: 'seller@test.com', name: '이판매', role: 'seller', password: '1234' },
      { id: 'u3', email: 'admin@test.com', name: '최관리', role: 'admin', password: '1234' },
    ]);
    console.log('Seed data inserted');
  }
}
