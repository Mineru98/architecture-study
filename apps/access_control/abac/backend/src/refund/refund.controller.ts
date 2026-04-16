/**
 * 환불 컨트롤러
 * GET /api/refunds
 * POST /api/refunds (ABAC 가드 적용)
 */

import {
  Controller, Get, Post, Param, Body, UseGuards,
  Headers, HttpException, HttpStatus, Req
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { RefundService } from "./refund.service.js";
import { AbacGuard } from "../abac/guard/abac.guard.js";
import { CheckAccess } from "../abac/guard/check-access.decorator.js";
import type { Request } from "express";

@ApiTags("refunds")
@Controller("api/refunds")
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @Get()
  @ApiOperation({ summary: "환불 목록 조회 (admin만)" })
  findAll(@Headers("x-user-role") role: string) {
    if (role !== "admin") {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    return this.refundService.findAll();
  }

  @Post()
  @UseGuards(AbacGuard)
  @CheckAccess("refund", "refund")
  @ApiOperation({ summary: "환불 생성 (ABAC 가드)" })
  create(
    @Body() body: { userId: string; productId: string; amount: number },
    @Headers("x-user-id") userId: string,
    @Req() req: Request
  ) {
    // ABAC 평가 결과 확인
    const decision = (req as any).abacDecision;
    if (decision?.decision === "deny") {
      throw new HttpException(
        { statusCode: HttpStatus.FORBIDDEN, message: "Access denied", reason: decision.reason },
        HttpStatus.FORBIDDEN
      );
    }

    const refund = this.refundService.create({
      userId: userId || body.userId,
      productId: body.productId,
      amount: body.amount,
      status: "pending",
    });

    return {
      ...refund,
      abacDecision: decision,
    };
  }
}