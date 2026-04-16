import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../common/entities';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  async findAll(userId?: string): Promise<Order[]> {
    if (userId) {
      return this.orderRepo.find({ where: { userId } });
    }
    return this.orderRepo.find();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderRepo.findOne({ where: { id } });
  }

  async create(userId: string, items: any[], total: number): Promise<Order> {
    const order = this.orderRepo.create({
      id: uuidv4(),
      userId,
      items,
      total,
      status: 'pending',
    });
    return this.orderRepo.save(order);
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    await this.orderRepo.update(id, { status });
    return this.orderRepo.findOne({ where: { id } });
  }
}
