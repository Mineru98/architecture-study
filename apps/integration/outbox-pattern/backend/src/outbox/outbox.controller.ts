import { Controller, Get, Post, HttpStatus } from '@nestjs/common';
import { OutboxService } from './outbox.service';

@Controller('v1/outbox')
export class OutboxController {
  constructor(private outboxService: OutboxService) {}

  @Get('status')
  async getStatus() {
    const [stats, recent] = await Promise.all([
      this.outboxService.getStats(),
      this.outboxService.getRecent(),
    ]);
    return { data: { stats, recentMessages: recent }, statusCode: HttpStatus.OK };
  }

  @Post('process')
  async triggerProcess() {
    const processed = await this.outboxService.processOutbox();
    return { data: { processed }, statusCode: HttpStatus.OK };
  }
}
