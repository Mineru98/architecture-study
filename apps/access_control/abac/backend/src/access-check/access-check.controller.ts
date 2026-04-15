import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { PolicyDecisionPoint } from "../abac/engine/policy-decision-point";
import { PolicyStore } from "../abac/engine/policy-store";
import { AccessRequest } from "../abac/engine/policy.types";
import { AuditService } from "../audit/audit.service";
import { ProductService } from "../product/product.service";
import { RefundService } from "../refund/refund.service";
import { UserService } from "../user/user.service";

class EnvironmentOverrideDto {
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsNumber()
  currentHour?: number;

  @IsOptional()
  @IsBoolean()
  isTrustedNetwork?: boolean;
}

class AccessCheckDto {
  @IsString()
  subjectId!: string;

  @IsString()
  resourceType!: string;

  @IsString()
  resourceId!: string;

  @IsString()
  action!: string;

  @IsOptional()
  @IsObject()
  environment?: EnvironmentOverrideDto;
}

@ApiTags("access-check")
@Controller()
export class AccessCheckController {
  constructor(
    private readonly pdp: PolicyDecisionPoint,
    private readonly policyStore: PolicyStore,
    private readonly auditService: AuditService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly refundService: RefundService,
  ) {}

  @Get("health")
  @ApiOperation({ summary: "Health check" })
  getHealth() {
    return { status: "ok", updatedAt: new Date().toISOString() };
  }

  @Post("access-check")
  @ApiOperation({ summary: "접근 권한 평가 (ABAC PDP 직접 호출)" })
  evaluate(@Body() dto: AccessCheckDto) {
    const user = this.userService.findById(dto.subjectId);
    const subjectAttrs: Record<string, any> = user
      ? { userId: user.id, role: user.role, department: user.department, trustLevel: user.trustLevel }
      : { userId: dto.subjectId, role: "anonymous", trustLevel: 0 };

    let resourceAttrs: Record<string, any> = { resourceType: dto.resourceType, resourceId: dto.resourceId };

    if (dto.resourceType === "product") {
      const product = this.productService.findById(dto.resourceId);
      if (product) {
        resourceAttrs = {
          ...resourceAttrs,
          ownerId: product.ownerId,
          price: product.price,
          category: product.category,
        };
      }
    } else if (dto.resourceType === "refund") {
      const refund = this.refundService.findById(dto.resourceId);
      if (refund) {
        resourceAttrs = {
          ...resourceAttrs,
          amount: refund.amount,
          requesterId: refund.requesterId,
        };
      }
    }

    const now = new Date();
    const environmentAttrs: Record<string, any> = {
      ipAddress: dto.environment?.ipAddress ?? "127.0.0.1",
      currentTime: now.toISOString(),
      currentHour: dto.environment?.currentHour ?? now.getHours(),
      isTrustedNetwork: dto.environment?.isTrustedNetwork ?? false,
    };

    const accessRequest: AccessRequest = {
      subject: subjectAttrs,
      resource: resourceAttrs,
      action: { type: dto.action },
      environment: environmentAttrs,
    };

    const decision = this.pdp.evaluate(accessRequest);
    this.auditService.log(decision, {
      subjectId: dto.subjectId,
      resourceType: dto.resourceType,
      resourceId: dto.resourceId,
      action: dto.action,
    });

    return decision;
  }

  @Get("policies")
  @ApiOperation({ summary: "전체 정책 목록 조회" })
  getPolicies() {
    return this.policyStore.getAll();
  }

  @Get("audit-log")
  @ApiOperation({ summary: "최근 감사 로그 조회 (최대 50건)" })
  getAuditLog() {
    return this.auditService.getRecent(50);
  }
}
