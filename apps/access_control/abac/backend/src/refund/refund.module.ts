/**
 * 환불 모듈
 */

import { Module } from "@nestjs/common";
import { RefundController } from "./refund.controller.js";
import { RefundService } from "./refund.service.js";

@Module({
  controllers: [RefundController],
  providers: [RefundService],
  exports: [RefundService],
})
export class RefundModule {}