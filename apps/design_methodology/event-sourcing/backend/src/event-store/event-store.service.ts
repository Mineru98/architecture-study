import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { BaseEvent } from '../events/order-events';

@Injectable()
export class EventStoreService {
  constructor(@Inject('REDIS') private redis: Redis) {}

  async append(event: BaseEvent): Promise<void> {
    const key = `events:${event.aggregateId}`;
    await this.redis.rpush(key, JSON.stringify(event));
  }

  async getEvents(aggregateId: string): Promise<BaseEvent[]> {
    const raw = await this.redis.lrange(`events:${aggregateId}`, 0, -1);
    return raw.map((r) => JSON.parse(r));
  }
}
