import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../../../entities';
import { IOrderRepository } from '../interfaces/order-repository.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TypeOrmOrderRepository implements IOrderRepository {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  async findAll(userId?: string): Promise<Order[]> {
    const where = userId ? { userId } : {};
    return this.repo.find({ where, order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Order | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<Order>): Promise<Order> {
    const order = this.repo.create({ ...data, id: uuidv4(), status: 'pending' });
    return this.repo.save(order);
  }

  async updateStatus(id: string, status: string): Promise<Order | null> {
    await this.repo.update(id, { status });
    return this.repo.findOne({ where: { id } });
  }
}
