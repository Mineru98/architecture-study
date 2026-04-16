/**
 * 헬스체크 모듈
 */
import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller.js";

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
