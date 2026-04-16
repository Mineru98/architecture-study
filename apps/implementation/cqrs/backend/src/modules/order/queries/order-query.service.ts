import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../../entities';

@Injectable()
export class OrderQueryService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  // Query: Get user orders
  async getOrders(userId?: string): Promise<Order[]> {
    const where = userId ? { userId } : {};
    return this.repo.find({ where, order: { createdAt: 'DESC' } });
  }

  // Query: Get order detail
  async getOrder(id: string): Promise<Order> {
    return this.repo.findOne({ where: { id } });
  }
}
