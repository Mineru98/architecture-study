import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly permissionService: PermissionService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return true;

    const controller = context.getClass();
    const handler = context.getHandler();

    const ROLE_ACTION_MAP: Record<string, Record<string, string>> = {
      ProductsController: {
        create: 'product.create',
        update: 'product.update',
        remove: 'product.delete',
      },
      OrdersController: {
        updatestatus: 'order.update:status',
      },
    };

    const requiredPermission = ROLE_ACTION_MAP[controller.name]?.[handler.name.toLowerCase()];
    if (!requiredPermission) return true;

    if (!this.permissionService.hasPermission(user.role, requiredPermission)) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
