/**
 * 접근 평가 모듈
 */

import { Module } from "@nestjs/common";
import { AccessCheckController } from "./access-check.controller.js";
import { AccessCheckService } from "./access-check.service.js";
import { AuditModule } from "../audit/audit.module.js";

@Module({
  imports: [AuditModule],
  controllers: [AccessCheckController],
  providers: [AccessCheckService],
  exports: [AccessCheckService],
})
export class AccessCheckModule {}