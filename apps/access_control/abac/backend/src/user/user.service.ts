/**
 * 사용자 서비스
 */

import { userStore, type User } from "./user.entity.js";

export class UserService {
  findAll(): User[] {
    return userStore.findAll();
  }

  findById(id: string): User | undefined {
    return userStore.findById(id);
  }
}