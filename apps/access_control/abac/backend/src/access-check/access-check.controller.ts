/**
 * 접근 평가 API 컨트롤러
 * POST /api/access-check - 접근 평가 시뮬레이션
 * GET /api/policies - 정책 목록
 * GET /api/audit-log - 감사 로그
 */

import { Controller, Get, Post, Body, Headers, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AccessCheckService } from "./access-check.service.js";
import { AuditService } from "../audit/audit.service.js";
import type { EvaluationContext } from "../abac/engine/policy.types.js";

@ApiTags("access-check")
@Controller("api")
export class AccessCheckController {
  constructor(
    private readonly accessCheckService: AccessCheckService,
    private readonly auditService: AuditService
  ) {}

  @Post("access-check")
  @ApiOperation({ summary: "접근 평가 시뮬레이션 (admin만)" })
  checkAccess(
    @Body() body: EvaluationContext,
    @Headers("x-user-role") role: string
  ) {
    if (role !== "admin") {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    return this.accessCheckService.evaluate(body);
  }

  @Get("policies")
  @ApiOperation({ summary: "정책 목록 조회" })
  getPolicies() {
    return this.accessCheckService.getPolicies();
  }

  @Get("audit-log")
  @ApiOperation({ summary: "감사 로그 조회 (최대 50건)" })
  getAuditLog(@Headers("x-user-role") role: string) {
    if (role !== "admin") {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    return this.auditService.findAll(50);
  }
}