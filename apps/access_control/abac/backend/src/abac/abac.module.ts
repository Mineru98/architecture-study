/**
 * ABAC 모듈
 * ABAC 엔진 핵심 (PDP, PEP, PIP)을 NestJS 모듈로 통합
 */

import { Module, Global } from "@nestjs/common";
import { AbacService } from "./abac.service.js";
import { AbacGuard } from "./guard/abac.guard.js";
import { policyStore } from "./engine/policy-store.js";

@Global()
@Module({
  providers: [
    AbacService,
    AbacGuard,
    {
      provide: "POLICY_STORE",
      useValue: policyStore,
    },
  ],
  exports: [AbacService, AbacGuard, "POLICY_STORE"],
})
export class AbacModule {
  /**
   * 모듈 초기화 시 정책 저장소 로드
   */
  constructor() {
    policyStore.initialize();
  }
}