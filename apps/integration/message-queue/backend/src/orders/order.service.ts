import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../common/entities';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  async findAll(userId?: string) {
    const where = userId ? { userId } : {};
    return this.repo.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async create(userId: string, items: any[], total: number) {
    const order = this.repo.create({ id: uuidv4(), userId, items, total, status: 'pending' });
    return this.repo.save(order);
  }

  async updateStatus(id: string, status: string) {
    await this.repo.update(id, { status });
    return this.repo.findOne({ where: { id } });
  }
}
