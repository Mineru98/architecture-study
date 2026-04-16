import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

export interface SubscriberCallback {
  (channel: string, data: any): Promise<void>;
}

@Injectable()
export class SubscriberService implements OnModuleInit {
  private subscriber: Redis;
  private callbacks: Map<string, SubscriberCallback[]> = new Map();

  constructor(@Inject('REDIS') private redis: Redis) {
    this.subscriber = new Redis({ host: 'localhost', port: 6380 });
  }

  async onModuleInit() {
    this.subscriber.on('message', (channel: string, message: string) => {
      const cleanChannel = channel.replace('pubsub:', '');
      const cbs = this.callbacks.get(cleanChannel) || [];
      try {
        const data = JSON.parse(message);
        cbs.forEach((cb) => cb(cleanChannel, data));
      } catch (e) {
        console.error(`[Subscriber] Error processing message on ${channel}:`, e);
      }
    });
  }

  async subscribe(channel: string, callback: SubscriberCallback): Promise<void> {
    if (!this.callbacks.has(channel)) {
      this.callbacks.set(channel, []);
      await this.subscriber.subscribe(`pubsub:${channel}`);
      console.log(`[Subscriber] Subscribed to channel: ${channel}`);
    }
    this.callbacks.get(channel)!.push(callback);
  }
}
