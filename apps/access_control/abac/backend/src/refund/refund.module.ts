import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { RefundService } from "./refund.service";
import { RefundController } from "./refund.controller";
import { RefundResourceMiddleware } from "./refund.middleware";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule],
  providers: [RefundService],
  controllers: [RefundController],
  exports: [RefundService],
})
export class RefundModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RefundResourceMiddleware)
      .forRoutes({ path: "refunds", method: RequestMethod.POST });
  }
}
