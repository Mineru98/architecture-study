import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../ports/out/user.repository';
import { SAMPLE_USERS } from '../seed';
@Injectable()
export class AuthService {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository, private jwt: JwtService) {}
  async seed() { const c = await this.userRepo.count(); if (c === 0) { for (const u of SAMPLE_USERS) await this.userRepo.save(u); } }
  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user || user.password !== password) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwt.sign({ sub: user.id, role: user.role });
    const { password: _, ...result } = user;
    return { user: result, token };
  }
  async me(token: string) {
    try {
      const payload = this.jwt.verify(token);
      const user = await this.userRepo.findById(payload.sub);
      if (!user) throw new UnauthorizedException();
      const { password: _, ...result } = user;
      return result;
    } catch { throw new UnauthorizedException(); }
  }
}
