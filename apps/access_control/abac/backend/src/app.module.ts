/**
 * NestJS 앱 모듈 정의
 * 모든 모듈을 조립
 */

import { Module } from "@nestjs/common";
import { AbacModule } from "./abac/abac.module.js";
import { UserModule } from "./user/user.module.js";
import { ProductModule } from "./product/product.module.js";
import { RefundModule } from "./refund/refund.module.js";
import { AuditModule } from "./audit/audit.module.js";
import { AccessCheckModule } from "./access-check/access-check.module.js";
import { HealthModule } from "./health/health.module.js";

@Module({
  imports: [
    AbacModule,
    UserModule,
    ProductModule,
    RefundModule,
    AuditModule,
    AccessCheckModule,
    HealthModule,
  ],
})
export class AppModule {}