import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './order.entity';
@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async findByUser(userId: string) { return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } }); }
  async findOne(id: string) { return this.repo.findOneBy({ id }); }
  async create(userId: string, items: any[]) {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return this.repo.save(this.repo.create({ id: uuidv4(), userId, items, total, status: 'pending' }));
  }
  async updateStatus(id: string, status: string) { await this.repo.update(id, { status }); return this.repo.findOneBy({ id }); }
  async findAll() { return this.repo.find({ order: { createdAt: 'DESC' } }); }
}
