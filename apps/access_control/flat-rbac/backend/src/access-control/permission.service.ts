import { Injectable } from '@nestjs/common';

// Flat RBAC: explicit role definitions with permissions array per role
interface RoleDefinition {
  name: string;
  description: string;
  permissions: string[];
}

const ROLES: Record<string, RoleDefinition> = {
  customer: {
    name: 'Customer',
    description: '일반 고객',
    permissions: ['product.read', 'order.create', 'order.read:own', 'order.cancel:own'],
  },
  seller: {
    name: 'Seller',
    description: '판매자',
    permissions: ['product.read', 'product.create:own', 'product.update:own', 'order.read', 'order.update:status'],
  },
  'cs-agent': {
    name: 'CS Agent',
    description: '고객 상담원',
    permissions: ['product.read', 'order.read', 'order.update:status', 'order.cancel', 'customer.read'],
  },
  'settlement-manager': {
    name: 'Settlement Manager',
    description: '정산 관리자',
    permissions: ['product.read', 'order.read', 'settlement.read', 'settlement.export'],
  },
  admin: {
    name: 'Admin',
    description: '시스템 관리자',
    permissions: [
      'product.read', 'product.create', 'product.update', 'product.delete',
      'order.read', 'order.create', 'order.update:status', 'order.cancel',
      'user.read', 'user.create', 'user.update', 'user.delete',
      'settlement.read', 'settlement.export',
    ],
  },
};

@Injectable()
export class PermissionService {
  private readonly roles = ROLES;

  hasPermission(role: string, permission: string): boolean {
    const roleDef = this.roles[role];
    if (!roleDef) return false;
    // Check exact match or base permission match (e.g. 'product.create:own' matches 'product.create')
    return roleDef.permissions.includes(permission) ||
      roleDef.permissions.includes(permission.split(':')[0]);
  }

  getRoleDefinition(role: string): RoleDefinition | undefined {
    return this.roles[role];
  }

  getAllRoles(): Record<string, RoleDefinition> {
    return this.roles;
  }
}
