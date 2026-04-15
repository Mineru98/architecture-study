import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ProductResourceMiddleware } from "./product.middleware";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProductResourceMiddleware)
      .forRoutes({ path: "products/:id", method: RequestMethod.PUT });
  }
}
