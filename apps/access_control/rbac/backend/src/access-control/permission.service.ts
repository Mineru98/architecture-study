import { Injectable } from '@nestjs/common';

// Standard RBAC: User→Role→Permission mapping with audit log

interface AuditEntry {
  timestamp: Date;
  userId: string;
  role: string;
  permission: string;
  granted: boolean;
}

const ROLE_PERMISSIONS: Record<string, string[]> = {
  customer: ['product.read', 'order.create', 'order.read:own', 'order.cancel:own'],
  seller: ['product.read', 'product.create', 'product.update:own', 'order.read', 'order.update:status'],
  'cs-agent': ['product.read', 'order.read', 'order.update:status', 'order.cancel', 'customer.read'],
  admin: [
    'product.read', 'product.create', 'product.update', 'product.delete',
    'order.read', 'order.create', 'order.update:status', 'order.cancel',
    'user.read', 'user.create', 'user.update', 'user.delete',
    'role.assign', 'role.read',
  ],
};

@Injectable()
export class PermissionService {
  private auditLog: AuditEntry[] = [];

  hasPermission(userId: string, role: string, permission: string): boolean {
    const perms = ROLE_PERMISSIONS[role] || [];
    const granted = perms.includes(permission) || perms.includes(permission.split(':')[0]);

    this.auditLog.push({
      timestamp: new Date(),
      userId,
      role,
      permission,
      granted,
    });

    return granted;
  }

  getPermissions(role: string): string[] {
    return ROLE_PERMISSIONS[role] || [];
  }

  getAuditLog(userId?: string): AuditEntry[] {
    if (userId) return this.auditLog.filter((e) => e.userId === userId);
    return this.auditLog;
  }
}
