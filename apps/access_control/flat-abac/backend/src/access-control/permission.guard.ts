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

    const action = ACTION_MAP[controller.name]?.[handler.name.toLowerCase()];
    if (!action) return true;

    const subject = { role: user.role, department: user.role === 'cs-agent' ? 'support' : user.role === 'seller' ? 'sales' : 'general' };

    if (!this.permissionService.checkAccess(subject, action)) {
      throw new ForbiddenException('Access denied by ABAC policy');
    }
    return true;
  }
}
