import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../order.entity';
import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';

@Injectable()
export class OrderRepositoryImpl implements IOrderRepository {
  constructor(@InjectRepository(Order) private readonly repo: Repository<Order>) {}

  async findByUser(userId: string) { return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } }) as unknown as Promise<OrderEntity[]>; }
  async findOne(id: string) { return this.repo.findOneBy({ id }) as unknown as Promise<OrderEntity | null>; }
  async create(order: OrderEntity) { return this.repo.save(this.repo.create(order)) as unknown as Promise<OrderEntity>; }
  async updateStatus(id: string, status: string) { await this.repo.update(id, { status }); return this.repo.findOneBy({ id }) as unknown as Promise<OrderEntity | null>; }
  async findAll() { return this.repo.find({ order: { createdAt: 'DESC' } }) as unknown as Promise<OrderEntity[]>; }
}
