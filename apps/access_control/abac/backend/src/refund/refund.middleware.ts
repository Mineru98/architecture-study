import { Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class RefundResourceMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  use(req: any, _res: any, next: () => void) {
    req.userService = this.userService;

    const body = req.body as Record<string, any> | undefined;
    if (body) {
      req.resolvedResource = {
        resourceId: body["productId"] ?? "",
        amount: body["amount"] ?? 0,
        orderId: body["orderId"] ?? "",
      };
    }
    next();
  }
}
