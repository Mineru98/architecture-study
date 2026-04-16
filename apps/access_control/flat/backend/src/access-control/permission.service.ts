import { Injectable } from '@nestjs/common';

// Flat Structure: simple role→permission map, no inheritance
const PERMISSIONS: Record<string, string[]> = {
  customer: ['product.read', 'order.create', 'order.read:own'],
  seller: ['product.read', 'product.create', 'product.update', 'order.create', 'order.read', 'order.update:status'],
  'cs-agent': ['product.read', 'order.read', 'order.update:status'],
  admin: ['product.read', 'product.create', 'product.update', 'product.delete', 'order.read', 'order.create', 'order.update:status', 'user.read'],
};

@Injectable()
export class PermissionService {
  private readonly permissions = PERMISSIONS;

  hasPermission(role: string, permission: string): boolean {
    const perms = this.permissions[role] || [];
    return perms.includes(permission) || perms.includes(permission.split(':')[0]);
  }

  getAllPermissions(role: string): string[] {
    return this.permissions[role] || [];
  }
}
