import { Injectable } from '@nestjs/common';

// Hierarchical: role inheritance chains. admin inherits ops-manager inherits cs-agent.
const HIERARCHY: Record<string, string[]> = {
  admin: ['ops-manager'],
  'ops-manager': ['cs-agent'],
  'cs-agent': [],
  seller: [],
  customer: [],
};

const ROLE_PERMISSIONS: Record<string, string[]> = {
  customer: ['product.read', 'order.create', 'order.read:own'],
  seller: ['product.read', 'product.create', 'product.update', 'order.read', 'order.update:status'],
  'cs-agent': ['product.read', 'order.read', 'order.update:status', 'customer.read'],
  'ops-manager': ['order.read', 'order.update:status', 'order.cancel', 'report.read', 'cs-agent.manage'],
  admin: ['product.read', 'product.create', 'product.update', 'product.delete', 'user.read', 'user.manage', 'system.configure'],
};

@Injectable()
export class PermissionService {
  /** Resolve all inherited roles from a given role */
  resolveRoles(role: string): string[] {
    const roles = [role];
    const parents = HIERARCHY[role] || [];
    for (const parent of parents) {
      roles.push(...this.resolveRoles(parent));
    }
    return [...new Set(roles)];
  }

  /** Get all permissions including inherited */
  resolvePermissions(role: string): string[] {
    const roles = this.resolveRoles(role);
    const perms = new Set<string>();
    for (const r of roles) {
      for (const p of ROLE_PERMISSIONS[r] || []) {
        perms.add(p);
      }
    }
    return [...perms];
  }

  hasPermission(role: string, permission: string): boolean {
    const perms = this.resolvePermissions(role);
    return perms.includes(permission) || perms.includes(permission.split(':')[0]);
  }

  getHierarchy(): Record<string, string[]> {
    return HIERARCHY;
  }
}
