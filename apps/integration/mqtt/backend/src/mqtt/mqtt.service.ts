import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

export interface MqttMessage {
  topic: string;
  payload: any;
  qos: number;
  retain: boolean;
  timestamp: Date;
}

@Injectable()
export class MqttService implements OnModuleInit {
  private subscriber: Redis;
  private subscriptions: Map<string, ((topic: string, payload: any) => void)[]> = new Map();
  private messageLog: MqttMessage[] = [];

  constructor(@Inject('REDIS') private redis: Redis) {
    this.subscriber = new Redis({ host: 'localhost', port: 6380 });
  }

  async onModuleInit() {
    this.subscriber.on('message', (channel: string, message: string) => {
      const topic = channel.replace('mqtt:', '');
      const callbacks = this.subscriptions.get(topic) || [];

      // Also check wildcard subscriptions
      for (const [pattern, cbs] of this.subscriptions.entries()) {
        if (this.topicMatch(pattern, topic)) {
          try {
            const data = JSON.parse(message);
            cbs.forEach((cb) => cb(topic, data));
          } catch {}
        }
      }

      callbacks.forEach((cb) => {
        try {
          const data = JSON.parse(message);
          cb(topic, data);
        } catch {}
      });
    });

    // Subscribe to predefined topics
    await this.subscribe('shopping/products/+', (topic, payload) => {
      console.log(`[MQTT] Received on ${topic}:`, payload);
    });
    await this.subscribe('shopping/orders/+/status', (topic, payload) => {
      console.log(`[MQTT] Order status update on ${topic}:`, payload);
    });
    await this.subscribe('shopping/users/+', (topic, payload) => {
      console.log(`[MQTT] User event on ${topic}:`, payload);
    });

    console.log('[MQTT] Broker simulated and subscribers initialized');
  }

  async publish(topic: string, payload: any, qos = 0, retain = false): Promise<void> {
    const message: MqttMessage = {
      topic,
      payload,
      qos,
      retain,
      timestamp: new Date(),
    };

    this.messageLog.push(message);
    if (this.messageLog.length > 100) this.messageLog.shift();

    await this.redis.publish(`mqtt:${topic}`, JSON.stringify(message));
    console.log(`[MQTT] Published to ${topic}`);
  }

  async subscribe(topic: string, callback: (topic: string, payload: any) => void): Promise<void> {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, []);
      await this.subscriber.subscribe(`mqtt:${topic}`);
    }
    this.subscriptions.get(topic)!.push(callback);
  }

  getMessageLog(): MqttMessage[] {
    return this.messageLog;
  }

  getSubscriptions(): string[] {
    return Array.from(this.subscriptions.keys());
  }

  private topicMatch(pattern: string, topic: string): boolean {
    if (pattern === topic) return true;
    const patternParts = pattern.split('/');
    const topicParts = topic.split('/');
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i] === '+') continue;
      if (patternParts[i] === '#') return true;
      if (patternParts[i] !== topicParts[i]) return false;
    }
    return patternParts.length === topicParts.length;
  }
}
