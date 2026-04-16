import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../common/entities';
import { OutboxMessage } from '../outbox/outbox.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private dataSource: DataSource,
  ) {}

  async findAll(userId?: string) {
    const where = userId ? { userId } : {};
    return this.repo.find({ where, order: { createdAt: 'DESC' } });
  }

  async create(userId: string, items: any[], total: number): Promise<Order> {
    const orderId = uuidv4();

    // Use transaction: save order AND outbox message atomically
    const order = await this.dataSource.transaction(async (manager) => {
      const newOrder = manager.create(Order, {
        id: orderId,
        userId,
        items,
        total,
        status: 'pending',
      });
      const savedOrder = await manager.save(newOrder);

      // Save event to outbox in same transaction
      const outboxMessage = manager.create(OutboxMessage, {
        id: uuidv4(),
        aggregateType: 'order',
        aggregateId: orderId,
        eventType: 'OrderCreated',
        payload: { userId, items, total, orderId },
        status: 'pending',
      });
      await manager.save(outboxMessage);

      console.log(`[OrderService] Order ${orderId} created with outbox message`);
      return savedOrder;
    });

    return order;
  }

  async updateStatus(id: string, status: string) {
    await this.repo.update(id, { status });

    // Also add status change to outbox
    const outboxRepo = this.dataSource.getRepository(OutboxMessage);
    await outboxRepo.save({
      id: uuidv4(),
      aggregateType: 'order',
      aggregateId: id,
      eventType: 'OrderStatusChanged',
      payload: { orderId: id, newStatus: status },
      status: 'pending',
    });

    return this.repo.findOne({ where: { id } });
  }
}
