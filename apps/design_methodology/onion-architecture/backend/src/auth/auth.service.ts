import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../core/application/users.service';
@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}
  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || user.password !== password) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwt.sign({ sub: user.id, role: user.role });
    const { password: _, ...result } = user;
    return { user: result, token };
  }
  async me(token: string) {
    try {
      const payload = this.jwt.verify(token);
      const user = await this.users.findById(payload.sub);
      if (!user) throw new UnauthorizedException();
      const { password: _, ...result } = user;
      return result;
    } catch { throw new UnauthorizedException(); }
  }
}
