/**
 * 상품 컨트롤러
 * GET /api/products
 * PUT /api/products/:id (ABAC 가드 적용)
 */

import {
  Controller, Get, Put, Param, Body, UseGuards,
  Headers, HttpException, HttpStatus, Req
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ProductService } from "./product.service.js";
import { AbacGuard } from "../abac/guard/abac.guard.js";
import { CheckAccess } from "../abac/guard/check-access.decorator.js";
import type { Request } from "express";

@ApiTags("products")
@Controller("api/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: "상품 목록 조회 (인증 사용자)" })
  findAll() {
    return this.productService.findAll();
  }

  @Put(":id")
  @UseGuards(AbacGuard)
  @CheckAccess("update", "product")
  @ApiOperation({ summary: "상품 정보 수정 (ABAC 가드)" })
  update(
    @Param("id") id: string,
    @Body() body: { name?: string; price?: number },
    @Req() req: Request
  ) {
    const product = this.productService.findById(id);
    if (!product) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }

    // ABAC 평가 결과 확인 (가드에서 설정됨)
    const decision = (req as any).abacDecision;
    if (decision?.decision === "deny") {
      throw new HttpException(
        { statusCode: HttpStatus.FORBIDDEN, message: "Access denied", reason: decision.reason },
        HttpStatus.FORBIDDEN
      );
    }

    // 상품 정보 업데이트
    const updated = this.productService.update(id, body);
    return {
      ...updated,
      abacDecision: decision,
    };
  }
}