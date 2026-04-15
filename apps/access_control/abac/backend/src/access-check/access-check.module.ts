import { Module } from "@nestjs/common";
import { AccessCheckController } from "./access-check.controller";
import { UserModule } from "../user/user.module";
import { ProductModule } from "../product/product.module";
import { RefundModule } from "../refund/refund.module";

@Module({
  imports: [UserModule, ProductModule, RefundModule],
  controllers: [AccessCheckController],
})
export class AccessCheckModule {}
