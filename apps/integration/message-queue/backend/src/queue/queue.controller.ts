import { Controller, Get, HttpStatus } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('v1/queue')
export class QueueController {
  constructor(private queueService: QueueService) {}

  @Get('status')
  async getStatus() {
    const [length, history] = await Promise.all([
      this.queueService.getQueueLength('orders'),
      this.queueService.getHistory('orders'),
    ]);
    return {
      data: {
        pendingCount: length,
        processedHistory: history.slice(-10).reverse(),
      },
      statusCode: HttpStatus.OK,
    };
  }
}
