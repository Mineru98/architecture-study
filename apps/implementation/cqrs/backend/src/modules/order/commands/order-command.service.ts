import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../../entities';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderCommandService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  // Command: Create order
  async createOrder(userId: string, items: any[], total: number): Promise<Order> {
    const order = this.repo.create({ id: uuidv4(), userId, items, total, status: 'pending' });
    return this.repo.save(order);
  }

  // Command: Update order status
  async updateOrderStatus(id: string, status: string): Promise<Order> {
    await this.repo.update(id, { status });
    return this.repo.findOne({ where: { id } });
  }
}
