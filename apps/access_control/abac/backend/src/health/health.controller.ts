/**
 * 헬스체크 컨트롤러
 * GET /api/health
 */

import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("health")
@Controller("api")
export class HealthController {
  @Get("health")
  @ApiOperation({ summary: "헬스체크" })
  check() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "ABAC Access Control Backend",
    };
  }
}
