import { Global, Module } from "@nestjs/common";
import { PolicyStore } from "./engine/policy-store";
import { PolicyDecisionPoint } from "./engine/policy-decision-point";
import { AbacGuard } from "./guard/abac.guard";

@Global()
@Module({
  providers: [PolicyStore, PolicyDecisionPoint, AbacGuard],
  exports: [PolicyStore, PolicyDecisionPoint, AbacGuard],
})
export class AbacModule {}
