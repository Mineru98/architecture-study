import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../common/entities';
import { v4 as uuidv4 } from 'uuid';
import { PublisherService } from '../pubsub/publisher.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private publisher: PublisherService,
  ) {}

  async findAll(userId?: string) {
    const where = userId ? { userId } : {};
    return this.repo.find({ where, order: { createdAt: 'DESC' } });
  }

  async create(userId: string, items: any[], total: number) {
    const order = this.repo.create({ id: uuidv4(), userId, items, total, status: 'pending' });
    const saved = await this.repo.save(order);

    // Publish OrderCreatedEvent
    await this.publisher.publish('order:created', {
      type: 'OrderCreatedEvent',
      orderId: saved.id,
      userId,
      total,
      items,
      createdAt: saved.createdAt,
    });

    return saved;
  }

  async updateStatus(id: string, status: string) {
    await this.repo.update(id, { status });
    const order = await this.repo.findOne({ where: { id } });

    // Publish OrderStatusChangedEvent
    await this.publisher.publish('order:statusChanged', {
      type: 'OrderStatusChangedEvent',
      orderId: id,
      newStatus: status,
      changedAt: new Date(),
    });

    return order;
  }
}
