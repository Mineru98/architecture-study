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

    const ACTION_MAP: Record<string, Record<string, string>> = {
      ProductsController: { create: 'product.create', update: 'product.update', remove: 'product.delete' },
      OrdersController: { updatestatus: 'order.update:status' },
    };

    const required = ACTION_MAP[controller.name]?.[handler.name.toLowerCase()];
    if (!required) return true;

    if (!this.permissionService.hasPermission(user.id || user.sub, user.role, required)) {
      throw new ForbiddenException('Access denied (ReBAC)');
    }
    return true;
  }
}
