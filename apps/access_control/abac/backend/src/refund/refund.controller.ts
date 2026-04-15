import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AbacGuard } from "../abac/guard/abac.guard";
import { CheckAccess } from "../abac/guard/check-access.decorator";
import { AuditService } from "../audit/audit.service";
import { CreateRefundDto } from "./dto/create-refund.dto";
import { RefundService } from "./refund.service";

@ApiTags("refunds")
@Controller("refunds")
export class RefundController {
  constructor(
    private readonly refundService: RefundService,
    private readonly auditService: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: "전체 환불 목록 조회" })
  findAll() {
    return this.refundService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "환불 신청 (ABAC 접근 제어 적용)" })
  @CheckAccess({ resourceType: "refund", action: "refund" })
  @UseGuards(AbacGuard)
  create(@Body() dto: CreateRefundDto, @Req() req: any) {
    const userId = req.headers["x-user-id"] ?? "anonymous";
    const refund = this.refundService.create(dto, userId);

    if (req.abacDecision) {
      this.auditService.log(req.abacDecision, req.abacCheckInput);
    }

    return refund;
  }
}
