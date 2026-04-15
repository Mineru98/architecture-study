import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
  @ApiPropertyOptional({ description: "상품 이름" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: "상품 가격" })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ description: "상품 카테고리" })
  @IsOptional()
  @IsString()
  category?: string;
}
