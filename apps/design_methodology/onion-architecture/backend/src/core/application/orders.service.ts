import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from '../domain/order';

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDER_REPO') private repo: Repository<any>) {}
  async findByUser(userId: string) { return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } }); }
  async findOne(id: string) { return this.repo.findOneBy({ id }); }
  async create(userId: string, items: OrderItem[]) {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return this.repo.save(this.repo.create({ id: uuidv4(), userId, items, total, status: 'pending' }));
  }
  async updateStatus(id: string, status: string) { await this.repo.update(id, { status }); return this.repo.findOneBy({ id }); }
  async findAll() { return this.repo.find({ order: { createdAt: 'DESC' } }); }
}
