import { Injectable } from '@nestjs/common';

// Hierarchical RBAC: RBAC with role hierarchy tree
// platform-admin → ops-manager → cs-agent
// seller-owner → seller-staff

interface RoleNode {
  name: string;
  permissions: string[];
  inherits: string[];
}

const ROLE_TREE: Record<string, RoleNode> = {
  'platform-admin': {
    name: 'Platform Admin',
    permissions: ['product.delete', 'user.manage', 'system.configure', 'report.read'],
    inherits: ['ops-manager'],
  },
  'ops-manager': {
    name: 'Operations Manager',
    permissions: ['order.cancel', 'report.read', 'cs-agent.manage'],
    inherits: ['cs-agent'],
  },
  'cs-agent': {
    name: 'CS Agent',
    permissions: ['product.read', 'order.read', 'order.update:status', 'customer.read'],
    inherits: [],
  },
  'seller-owner': {
    name: 'Seller Owner',
    permissions: ['product.read', 'product.create', 'product.update', 'product.delete:own', 'order.read', 'order.update:status', 'seller.manage'],
    inherits: ['seller-staff'],
  },
  'seller-staff': {
    name: 'Seller Staff',
    permissions: ['product.read', 'product.create', 'order.read'],
    inherits: [],
  },
  customer: {
    name: 'Customer',
    permissions: ['product.read', 'order.create', 'order.read:own', 'order.cancel:own'],
    inherits: [],
  },
};

// Map simple roles to hierarchical roles
const ROLE_MAP: Record<string, string> = {
  customer: 'customer',
  seller: 'seller-owner',
  'cs-agent': 'cs-agent',
  admin: 'platform-admin',
};

@Injectable()
export class PermissionService {
  private readonly roleTree = ROLE_TREE;

  resolvePermissions(roleName: string): string[] {
    const mappedRole = ROLE_MAP[roleName] || roleName;
    const node = this.roleTree[mappedRole];
    if (!node) return [];

    const perms = new Set(node.permissions);
    for (const inherited of node.inherits) {
      for (const p of this.resolvePermissions(inherited)) {
        perms.add(p);
      }
    }
    return [...perms];
  }

  hasPermission(role: string, permission: string): boolean {
    const perms = this.resolvePermissions(role);
    return perms.includes(permission) || perms.includes(permission.split(':')[0]);
  }

  getRoleTree(): Record<string, RoleNode> {
    return this.roleTree;
  }
}
