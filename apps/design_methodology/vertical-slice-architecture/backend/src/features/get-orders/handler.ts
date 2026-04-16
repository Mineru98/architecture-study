import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../order.entity';
@Injectable()
export class GetOrdersHandler {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async execute(userId?: string) {
    if (userId) return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
