import { Controller, Get, HttpStatus } from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Controller('v1/pubsub')
export class PubsubController {
  constructor(private publisher: PublisherService) {}

  @Get('events')
  async getEvents() {
    return {
      data: this.publisher.getEventLog().slice(-20).reverse(),
      statusCode: HttpStatus.OK,
    };
  }
}
