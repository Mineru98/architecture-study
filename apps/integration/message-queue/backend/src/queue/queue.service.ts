import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

export interface QueueMessage {
  id: string;
  type: string;
  payload: any;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  processedAt?: Date;
  error?: string;
}

@Injectable()
export class QueueService {
  constructor(@Inject('REDIS') private redis: Redis) {}

  async enqueue(queueName: string, type: string, payload: any): Promise<QueueMessage> {
    const message: QueueMessage = {
      id: uuidv4(),
      type,
      payload,
      status: 'queued',
      createdAt: new Date(),
    };
    await this.redis.rpush(`queue:${queueName}`, JSON.stringify(message));
    await this.redis.publish(`queue:${queueName}:events`, JSON.stringify({ event: 'enqueued', messageId: message.id }));
    return message;
  }

  async dequeue(queueName: string): Promise<QueueMessage | null> {
    const data = await this.redis.lpop(`queue:${queueName}`);
    if (!data) return null;
    return JSON.parse(data);
  }

  async getQueueLength(queueName: string): Promise<number> {
    return this.redis.llen(`queue:${queueName}`);
  }

  async getQueueMessages(queueName: string): Promise<QueueMessage[]> {
    const messages = await this.redis.lrange(`queue:${queueName}`, 0, -1);
    return messages.map((m) => JSON.parse(m));
  }

  async updateMessageStatus(queueName: string, messageId: string, status: QueueMessage['status'], error?: string): Promise<void> {
    const messages = await this.redis.lrange(`queue:${queueName}:history`, 0, -1);
    for (let i = 0; i < messages.length; i++) {
      const msg: QueueMessage = JSON.parse(messages[i]);
      if (msg.id === messageId) {
        msg.status = status;
        msg.processedAt = new Date();
        if (error) msg.error = error;
        await this.redis.lset(`queue:${queueName}:history`, i, JSON.stringify(msg));
        break;
      }
    }
  }

  async moveToHistory(queueName: string, message: QueueMessage, status: QueueMessage['status']): Promise<void> {
    message.status = status;
    message.processedAt = new Date();
    await this.redis.rpush(`queue:${queueName}:history`, JSON.stringify(message));
  }

  async getHistory(queueName: string): Promise<QueueMessage[]> {
    const messages = await this.redis.lrange(`queue:${queueName}:history`, 0, -1);
    return messages.map((m) => JSON.parse(m));
  }
}
