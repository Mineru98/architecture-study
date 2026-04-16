import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';
import { EventStoreService } from '../event-store/event-store.service';

@Injectable()
export class OrderProjection {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    private eventStore: EventStoreService,
  ) {}

  async rebuild(aggregateId: string): Promise<Order | null> {
    const events = await this.eventStore.getEvents(aggregateId);
    if (events.length === 0) return null;
    let order: any = null;
    for (const event of events) {
      if (event.eventType === 'ORDER_CREATED') {
        order = this.repo.create({ id: event.aggregateId, ...event.data, createdAt: new Date() });
      } else if (event.eventType === 'ORDER_STATUS_CHANGED') {
        if (order) order.status = event.data.status;
      }
    }
    return order;
  }

  async findByUser(userId: string) { return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } }); }
  async findOne(id: string) { return this.repo.findOneBy({ id }); }
  async save(order: any) { return this.repo.save(order); }
  async updateStatus(id: string, status: string) { await this.repo.update(id, { status }); return this.repo.findOneBy({ id }); }
  async findAll() { return this.repo.find({ order: { createdAt: 'DESC' } }); }
}
