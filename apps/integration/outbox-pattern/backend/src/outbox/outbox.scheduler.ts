import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OutboxService } from './outbox.service';

@Injectable()
export class OutboxScheduler {
  constructor(private outboxService: OutboxService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    const processed = await this.outboxService.processOutbox();
    if (processed > 0) {
      console.log(`[OutboxScheduler] Processed ${processed} messages`);
    }
  }
}
