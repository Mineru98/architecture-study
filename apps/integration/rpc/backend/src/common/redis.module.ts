import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useValue: new Redis({ host: 'localhost', port: 6380 }),
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
