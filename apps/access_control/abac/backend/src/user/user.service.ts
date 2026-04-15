import { Injectable } from "@nestjs/common";
import { User, seedUsers } from "./user.data";

@Injectable()
export class UserService {
  private readonly users: User[] = [...seedUsers];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}
