import { Injectable, Inject } from '@nestjs/common';
import { IOrderRepository } from './repositories/interfaces/order-repository.interface';

@Injectable()
export class OrderService {
  constructor(@Inject('IOrderRepository') private repo: IOrderRepository) {}

  async findAll(userId?: string) { return this.repo.findAll(userId); }
  async findOne(id: string) { return this.repo.findById(id); }
  async create(userId: string, items: any[], total: number) { return this.repo.create({ userId, items, total }); }
  async updateStatus(id: string, status: string) { return this.repo.updateStatus(id, status); }
}
