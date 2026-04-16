import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../order.entity';

export interface OrderPlugin {
  name: string;
  onOrderCreated?(order: any): Promise<void>;
  onOrderStatusChanged?(order: any, newStatus: string): Promise<void>;
}

@Injectable()
export class OrderService {
  private plugins: OrderPlugin[] = [];

  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  registerPlugin(plugin: OrderPlugin) { this.plugins.push(plugin); }

  async findByUser(userId: string) { return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } }); }
  async findOne(id: string) { return this.repo.findOneBy({ id }); }
  async findAll() { return this.repo.find({ order: { createdAt: 'DESC' } }); }

  async create(userId: string, items: any[]) {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = this.repo.create({ id: uuidv4(), userId, items, total, status: 'pending' });
    const saved = await this.repo.save(order);
    for (const plugin of this.plugins) {
      if (plugin.onOrderCreated) await plugin.onOrderCreated(saved);
    }
    return saved;
  }

  async updateStatus(id: string, status: string) {
    await this.repo.update(id, { status });
    const order = await this.repo.findOneBy({ id });
    for (const plugin of this.plugins) {
      if (plugin.onOrderStatusChanged) await plugin.onOrderStatusChanged(order, status);
    }
    return order;
  }
}
