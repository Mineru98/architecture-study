import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { SubscriberService } from './subscriber.service';
import { OrderChannel } from './channels/order.channel';
import { PubsubController } from './pubsub.controller';

@Module({
  controllers: [PubsubController],
  providers: [PublisherService, SubscriberService, OrderChannel],
  exports: [PublisherService, SubscriberService],
})
export class PubsubModule {}
