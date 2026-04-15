import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRefundDto {
  @ApiProperty({ description: "주문 ID" })
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @ApiProperty({ description: "상품 ID" })
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @ApiProperty({ description: "환불 금액" })
  @IsNumber()
  amount!: number;

  @ApiProperty({ description: "환불 사유" })
  @IsString()
  @IsNotEmpty()
  reason!: string;
}
