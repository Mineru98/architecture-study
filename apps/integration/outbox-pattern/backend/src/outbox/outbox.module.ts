import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { OutboxMessage } from './outbox.entity';
import { OutboxService } from './outbox.service';
import { OutboxScheduler } from './outbox.scheduler';
import { OutboxController } from './outbox.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OutboxMessage]),
    ScheduleModule.forRoot(),
  ],
  controllers: [OutboxController],
  providers: [OutboxService, OutboxScheduler],
  exports: [OutboxService],
})
export class OutboxModule {}
