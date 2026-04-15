import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { AbacGuard } from "../abac/guard/abac.guard";
import { CheckAccess } from "../abac/guard/check-access.decorator";
import { AuditService } from "../audit/audit.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductService } from "./product.service";

@ApiTags("products")
@Controller("products")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly auditService: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: "전체 상품 목록 조회" })
  findAll() {
    return this.productService.findAll();
  }

  @Put(":id")
  @ApiOperation({ summary: "상품 수정 (ABAC 접근 제어 적용)" })
  @ApiParam({ name: "id", description: "상품 ID" })
  @CheckAccess({ resourceType: "product", action: "update" })
  @UseGuards(AbacGuard)
  update(@Param("id") id: string, @Body() dto: UpdateProductDto, @Req() req: any) {
    const product = this.productService.findById(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    const updated = this.productService.update(id, dto);

    if (req.abacDecision) {
      this.auditService.log(req.abacDecision, req.abacCheckInput);
    }

    return updated;
  }
}
