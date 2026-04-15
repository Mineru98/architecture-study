import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { AbacModule } from "./abac/abac.module";
import { AuditModule } from "./audit/audit.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";
import { RefundModule } from "./refund/refund.module";
import { AccessCheckModule } from "./access-check/access-check.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 30 }]),
    AbacModule,
    AuditModule,
    UserModule,
    ProductModule,
    RefundModule,
    AccessCheckModule,
  ],
})
export class AppModule {}
