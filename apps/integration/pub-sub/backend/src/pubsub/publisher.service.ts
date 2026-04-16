import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

export interface PublishedEvent {
  channel: string;
  data: any;
  timestamp: Date;
}

@Injectable()
export class PublisherService {
  private eventLog: PublishedEvent[] = [];

  constructor(@Inject('REDIS') private redis: Redis) {}

  async publish(channel: string, data: any): Promise<void> {
    const event: PublishedEvent = {
      channel,
      data,
      timestamp: new Date(),
    };

    this.eventLog.push(event);
    if (this.eventLog.length > 100) this.eventLog.shift();

    await this.redis.publish(`pubsub:${channel}`, JSON.stringify(event));
    console.log(`[Publisher] Event published to ${channel}:`, data.type || 'event');
  }

  getEventLog(): PublishedEvent[] {
    return this.eventLog;
  }
}
