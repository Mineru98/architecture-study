import { Injectable } from '@nestjs/common';

// Graph-Based: graph traversal for permissions
// Nodes: users, organizations, brands, categories
// Edges: member-of, owner-of, admin-of
// Permission resolved by graph path existence

interface GraphNode {
  id: string;
  type: 'user' | 'org' | 'brand' | 'category';
}

interface GraphEdge {
  from: string;
  to: string;
  relation: string; // member-of, owner-of, admin-of, manages
}

const NODES: GraphNode[] = [
  { id: 'u1', type: 'user' },
  { id: 'u2', type: 'user' },
  { id: 'u3', type: 'user' },
  { id: 'u4', type: 'user' },
  { id: 'org-platform', type: 'org' },
  { id: 'org-seller', type: 'org' },
  { id: 'brand-a', type: 'brand' },
  { id: 'brand-b', type: 'brand' },
  { id: 'cat-electronics', type: 'category' },
  { id: 'cat-clothing', type: 'category' },
];

const EDGES: GraphEdge[] = [
  // User → Org relationships
  { from: 'u4', to: 'org-platform', relation: 'admin-of' },
  { from: 'u3', to: 'org-platform', relation: 'member-of' },
  { from: 'u2', to: 'org-seller', relation: 'owner-of' },
  // Org → Brand relationships
  { from: 'org-seller', to: 'brand-a', relation: 'owner-of' },
  { from: 'org-seller', to: 'brand-b', relation: 'owner-of' },
  { from: 'org-platform', to: 'brand-a', relation: 'manages' },
  { from: 'org-platform', to: 'brand-b', relation: 'manages' },
  // Brand → Category relationships
  { from: 'brand-a', to: 'cat-electronics', relation: 'manages' },
  { from: 'brand-b', to: 'cat-clothing', relation: 'manages' },
];

// Permission map: path pattern → permission
// If a path exists from user to a resource via certain relation chain, grant permission
const PATH_PERMISSIONS: { relationChain: string[]; targetNodeType: string; permissions: string[] }[] = [
  { relationChain: ['admin-of'], targetNodeType: 'org', permissions: ['product.read', 'product.create', 'product.update', 'product.delete', 'order.read', 'order.update:status', 'user.read'] },
  { relationChain: ['member-of'], targetNodeType: 'org', permissions: ['product.read', 'order.read', 'order.update:status'] },
  { relationChain: ['owner-of'], targetNodeType: 'org', permissions: ['product.read', 'product.create', 'product.update', 'order.read', 'order.update:status'] },
  { relationChain: ['owner-of', 'owner-of'], targetNodeType: 'brand', permissions: ['product.create', 'product.update', 'product.delete'] },
  { relationChain: ['admin-of', 'manages'], targetNodeType: 'brand', permissions: ['product.create', 'product.update', 'product.delete', 'order.read'] },
];

// Fallback for simple roles
const ROLE_FALLBACK: Record<string, string[]> = {
  customer: ['product.read', 'order.create', 'order.read:own'],
  seller: ['product.read', 'product.create', 'product.update', 'order.read', 'order.update:status'],
  'cs-agent': ['product.read', 'order.read', 'order.update:status'],
  admin: ['product.read', 'product.create', 'product.update', 'product.delete', 'order.read', 'order.update:status', 'user.read'],
};

@Injectable()
export class PermissionService {
  /** BFS to find all reachable nodes from a starting node with relation filter */
  findReachable(startId: string, allowedRelations: string[]): { nodeId: string; nodeType: string; path: string[] }[] {
    const results: { nodeId: string; nodeType: string; path: string[] }[] = [];
    const visited = new Set<string>();
    const queue: { id: string; path: string[] }[] = [{ id: startId, path: [] }];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current.id)) continue;
      visited.add(current.id);

      const node = NODES.find((n) => n.id === current.id);
      if (node && current.path.length > 0) {
        results.push({ nodeId: node.id, nodeType: node.type, path: current.path });
      }

      const outEdges = EDGES.filter((e) => e.from === current.id && allowedRelations.includes(e.relation));
      for (const edge of outEdges) {
        if (!visited.has(edge.to)) {
          queue.push({ id: edge.to, path: [...current.path, edge.relation] });
        }
      }
    }

    return results;
  }

  /** Resolve permissions by graph traversal */
  resolvePermissions(userId: string, role: string): string[] {
    // Start with role fallback
    const perms = new Set(ROLE_FALLBACK[role] || []);

    // Graph-based resolution
    for (const pp of PATH_PERMISSIONS) {
      const reachable = this.findReachable(userId, pp.relationChain);
      for (const r of reachable) {
        if (r.nodeType === pp.targetNodeType) {
          for (const p of pp.permissions) {
            perms.add(p);
          }
        }
      }
    }

    return [...perms];
  }

  hasPermission(userId: string, role: string, permission: string): boolean {
    const perms = this.resolvePermissions(userId, role);
    return perms.includes(permission) || perms.includes(permission.split(':')[0]);
  }

  getGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
    return { nodes: NODES, edges: EDGES };
  }
}
