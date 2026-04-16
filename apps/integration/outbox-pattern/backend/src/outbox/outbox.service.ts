import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OutboxMessage } from './outbox.entity';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';

@Injectable()
export class OutboxService {
  constructor(
    @InjectRepository(OutboxMessage) private repo: Repository<OutboxMessage>,
    @Inject('REDIS') private redis: Redis,
  ) {}

  async addToOutbox(aggregateType: string, aggregateId: string, eventType: string, payload: any): Promise<OutboxMessage> {
    const message = this.repo.create({
      id: uuidv4(),
      aggregateType,
      aggregateId,
      eventType,
      payload,
      status: 'pending',
    });
    const saved = await this.repo.save(message);
    console.log(`[Outbox] Message added: ${saved.id} (${eventType})`);
    return saved;
  }

  async processOutbox(): Promise<number> {
    const pending = await this.repo.find({ where: { status: 'pending' }, take: 10 });
    let processed = 0;

    for (const message of pending) {
      try {
        await this.repo.update(message.id, { status: 'processing' });

        // Simulate event processing (publish to Redis)
        await this.redis.publish(
          `outbox:${message.aggregateType}:${message.eventType}`,
          JSON.stringify({
            messageId: message.id,
            aggregateId: message.aggregateId,
            eventType: message.eventType,
            payload: message.payload,
          }),
        );

        await this.markProcessed(message.id);
        processed++;
        console.log(`[Outbox] Processed: ${message.id} (${message.eventType})`);
      } catch (error: any) {
        await this.repo.update(message.id, { status: 'failed', error: error.message });
        console.error(`[Outbox] Failed: ${message.id}`, error.message);
      }
    }

    return processed;
  }

  async markProcessed(id: string): Promise<void> {
    await this.repo.update(id, { status: 'processed', processedAt: new Date() });
  }

  async getPending(): Promise<OutboxMessage[]> {
    return this.repo.find({ where: { status: 'pending' }, order: { createdAt: 'ASC' } });
  }

  async getRecent(limit = 20): Promise<OutboxMessage[]> {
    return this.repo.find({ order: { createdAt: 'DESC' }, take: limit });
  }

  async getStats(): Promise<{ pending: number; processed: number; failed: number }> {
    const [pending, processed, failed] = await Promise.all([
      this.repo.count({ where: { status: 'pending' } }),
      this.repo.count({ where: { status: 'processed' } }),
      this.repo.count({ where: { status: 'failed' } }),
    ]);
    return { pending, processed, failed };
  }
}
