import { Injectable } from '@nestjs/common';

// Hybrid RBAC: standard RBAC + direct grants + conditional rules

interface ConditionalRule {
  name: string;
  permission: string;
  condition: (ctx: { user: any; resource?: any; env?: any }) => boolean;
}

const BASE_ROLE_PERMISSIONS: Record<string, string[]> = {
  customer: ['product.read', 'order.create', 'order.read:own'],
  seller: ['product.read', 'product.create', 'product.update', 'order.read', 'order.update:status'],
  'cs-agent': ['product.read', 'order.read', 'order.update:status'],
  admin: ['product.read', 'product.create', 'product.update', 'product.delete', 'order.read', 'order.update:status', 'user.read'],
};

// Direct grants: per-user extra permissions (would come from DB in production)
const DIRECT_GRANTS: Record<string, string[]> = {
  'u3': ['settlement.read'], // cs-agent u3 gets settlement.read via direct grant
};

// Conditional rules
const CONDITIONAL_RULES: ConditionalRule[] = [
  {
    name: 'settlement-manager-market-restriction',
    permission: 'settlement.read',
    condition: (ctx) => {
      // Settlement managers can only read KR/JP markets
      const allowedMarkets = ['KR', 'JP'];
      const market = ctx.resource?.market || ctx.env?.market || 'KR';
      return allowedMarkets.includes(market);
    },
  },
];

@Injectable()
export class PermissionService {
  /** Get effective permissions: base role + direct grants */
  getEffectivePermissions(userId: string, role: string): string[] {
    const base = BASE_ROLE_PERMISSIONS[role] || [];
    const direct = DIRECT_GRANTS[userId] || [];
    return [...new Set([...base, ...direct])];
  }

  hasPermission(userId: string, role: string, permission: string, resource?: any, env?: any): boolean {
    const perms = this.getEffectivePermissions(userId, role);

    // Check base permission
    if (perms.includes(permission) || perms.includes(permission.split(':')[0])) {
      // Check conditional rules
      for (const rule of CONDITIONAL_RULES) {
        if (rule.permission === permission) {
          if (!rule.condition({ user: { id: userId, role }, resource, env })) {
            continue; // condition not met, but other base perm may still apply
          }
        }
      }
      return true;
    }

    // Check conditional rules that might grant access
    for (const rule of CONDITIONAL_RULES) {
      if (rule.permission === permission && rule.condition({ user: { id: userId, role }, resource, env })) {
        return true;
      }
    }

    return false;
  }
}
