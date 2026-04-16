/**
 * 감사 로그 모듈
 */

import { Module, Global } from "@nestjs/common";
import { AuditService } from "./audit.service.js";

@Global()
@Module({
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}