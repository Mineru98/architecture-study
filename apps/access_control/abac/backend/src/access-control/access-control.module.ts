import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AbacGuard } from './abac.guard';
import { AbacService } from './abac.service';
import { AbacController } from './abac.controller';
import { PolicyStore } from './policy-store';
import { PolicyDecisionPoint } from './policy-decision-point';

@Global()
@Module({
  imports: [JwtModule.register({ secret: 'access-control-study', signOptions: { expiresIn: '24h' } })],
  controllers: [AbacController],
  providers: [
    PolicyStore,
    PolicyDecisionPoint,
    AbacService,
    AbacGuard,
    {
      provide: APP_GUARD,
      useClass: AbacGuard,
    },
  ],
  exports: [AbacService, AbacGuard],
})
export class AccessControlModule {}
