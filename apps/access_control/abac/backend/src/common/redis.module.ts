import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

export const REDIS_TOKEN = 'REDIS';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_TOKEN,
      useValue: new Redis({ host: 'localhost', port: 6380 }),
    },
  ],
  exports: [REDIS_TOKEN],
})
export class RedisModule {}
