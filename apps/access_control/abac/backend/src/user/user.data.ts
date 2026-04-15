export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  trustLevel: number;
}

export const seedUsers: User[] = [
  {
    id: "user-admin",
    name: "관리자 김",
    role: "admin",
    department: "management",
    trustLevel: 5,
  },
  {
    id: "user-seller-a",
    name: "판매자 박",
    role: "seller",
    department: "electronics",
    trustLevel: 3,
  },
  {
    id: "user-seller-b",
    name: "판매자 이",
    role: "seller",
    department: "fashion",
    trustLevel: 1,
  },
];
