import { Injectable, NestMiddleware } from "@nestjs/common";
import { ProductService } from "./product.service";
import { UserService } from "../user/user.service";

@Injectable()
export class ProductResourceMiddleware implements NestMiddleware {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  use(req: any, _res: any, next: () => void) {
    req.userService = this.userService;

    const id: string | undefined = req.params?.id;
    if (id) {
      const product = this.productService.findById(id);
      if (product) {
        req.resolvedResource = {
          resourceId: product.id,
          ownerId: product.ownerId,
          price: product.price,
          category: product.category,
        };
      }
    }
    next();
  }
}
