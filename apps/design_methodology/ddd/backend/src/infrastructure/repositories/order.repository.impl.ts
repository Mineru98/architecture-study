import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../order.entity';
import { IOrderRepository } from '../../domain/order/order.repository';
import { OrderAggregate } from '../../domain/order/order.aggregate';

@Injectable()
export class OrderRepositoryImpl implements IOrderRepository {
  constructor(@InjectRepository(Order) private readonly repo: Repository<Order>) {}
  async findByUser(userId: string) { return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } }) as any as Promise<OrderAggregate[]>; }
  async findOne(id: string) { return this.repo.findOneBy({ id }) as any as Promise<OrderAggregate | null>; }
  async save(order: OrderAggregate) { return this.repo.save(this.repo.create(order)) as any as Promise<OrderAggregate>; }
  async updateStatus(id: string, status: string) { await this.repo.update(id, { status }); return this.repo.findOneBy({ id }) as any as Promise<OrderAggregate | null>; }
  async findAll() { return this.repo.find({ order: { createdAt: 'DESC' } }) as any as Promise<OrderAggregate[]>; }
}
