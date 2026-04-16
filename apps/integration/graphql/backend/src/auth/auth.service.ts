import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ token: string; user: any } | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.password !== password) {
      return null;
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  }

  async me(token: string): Promise<any | null> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      if (!user) return null;
      return { id: user.id, email: user.email, name: user.name, role: user.role };
    } catch {
      return null;
    }
  }
}
