import { Injectable } from '@nestjs/common';

// ReBAC: relationship-based access control
// Define relationships (owner, member, viewer) between users and resources (stores, brands)

interface Relation {
  userId: string;
  resourceType: string;
  resourceId: string;
  relation: string;
}

const RELATIONS: Relation[] = [
  // Store ownership
  { userId: 'u2', resourceType: 'store', resourceId: 'store-1', relation: 'owner' },
  { userId: 'u4', resourceType: 'store', resourceId: 'store-1', relation: 'admin' },
  // Brand membership
  { userId: 'u2', resourceType: 'brand', resourceId: 'brand-a', relation: 'owner' },
  { userId: 'u4', resourceType: 'brand', resourceId: 'brand-a', relation: 'admin' },
  // Category viewership
  { userId: 'u3', resourceType: 'category', resourceId: '전자제품', relation: 'viewer' },
  { userId: 'u3', resourceType: 'category', resourceId: '의류', relation: 'viewer' },
];

// Permission derived from relation: relation → set of permissions
const RELATION_PERMISSIONS: Record<string, Record<string, string[]>> = {
  store: {
    owner: ['product.create', 'product.update', 'product.delete', 'order.read', 'order.update:status'],
    admin: ['product.create', 'product.update', 'order.read', 'order.update:status'],
    member: ['product.read', 'order.read'],
    viewer: ['product.read'],
  },
  brand: {
    owner: ['product.create', 'product.update', 'product.delete', 'brand.manage'],
    admin: ['product.create', 'product.update', 'brand.read'],
  },
  category: {
    viewer: ['product.read'],
  },
};

// Role-based fallback for non-resource-specific actions
const ROLE_FALLBACK: Record<string, string[]> = {
  customer: ['product.read', 'order.create', 'order.read:own'],
  seller: ['product.read'],
  'cs-agent': ['product.read', 'order.read', 'order.update:status'],
  admin: ['product.read', 'product.create', 'product.update', 'product.delete', 'order.read', 'order.update:status', 'user.read'],
};

@Injectable()
export class PermissionService {
  private readonly relations = RELATIONS;

  /** Check if user has a specific relation to a resource */
  hasRelation(userId: string, resourceType: string, resourceId: string, relation: string): boolean {
    return this.relations.some(
      (r) => r.userId === userId && r.resourceType === resourceType && r.resourceId === resourceId && r.relation === relation,
    );
  }

  /** Get all relations for a user */
  getUserRelations(userId: string): Relation[] {
    return this.relations.filter((r) => r.userId === userId);
  }

  /** Check permission via relation traversal */
  hasPermission(userId: string, role: string, permission: string, resourceType?: string, resourceId?: string): boolean {
    // First check role-based fallback
    const fallback = ROLE_FALLBACK[role] || [];
    if (fallback.includes(permission) || fallback.includes(permission.split(':')[0])) {
      return true;
    }

    // Then check relation-based permissions
    const userRelations = this.relations.filter((r) => r.userId === userId);
    for (const rel of userRelations) {
      const perms = RELATION_PERMISSIONS[rel.resourceType]?.[rel.relation] || [];
      if (perms.includes(permission) || perms.includes(permission.split(':')[0])) {
        // If resourceType/resourceId specified, verify match
        if (resourceType && resourceId) {
          if (rel.resourceType === resourceType && rel.resourceId === resourceId) return true;
        } else {
          return true;
        }
      }
    }

    return false;
  }
}
