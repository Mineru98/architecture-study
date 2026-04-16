/**
 * 사용자 엔티티
 * 인메모리 스토어 사용
 */

export interface User {
  id: string;
  name: string;
  role: "admin" | "seller" | "customer";
  trustLevel: number;
  ownerId?: string;  // 판매자의 경우 소유자 ID
  createdAt: Date;
}

// 인메모리 사용자 스토어
const users: User[] = [
  { id: "user-1", name: "Admin User", role: "admin", trustLevel: 5, createdAt: new Date("2026-01-01") },
  { id: "user-2", name: "Seller Kim", role: "seller", trustLevel: 3, ownerId: "user-2", createdAt: new Date("2026-01-02") },
  { id: "user-3", name: "Seller Lee", role: "seller", trustLevel: 3, ownerId: "user-3", createdAt: new Date("2026-01-03") },
  { id: "user-4", name: "Customer Park", role: "customer", trustLevel: 2, createdAt: new Date("2026-01-04") },
  { id: "user-5", name: "Customer Choi", role: "customer", trustLevel: 4, createdAt: new Date("2026-01-05") },
];

export const userStore = {
  findAll: () => [...users],
  findById: (id: string) => users.find(u => u.id === id),
};