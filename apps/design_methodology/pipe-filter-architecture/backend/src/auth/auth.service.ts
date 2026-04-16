import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { SAMPLE_USERS } from '../seed';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>, private jwt: JwtService) {}
  async seed() { const c = await this.repo.count(); if (c === 0) { for (const u of SAMPLE_USERS) await this.repo.save(this.repo.create(u)); } }
  async login(email: string, password: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user || user.password !== password) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwt.sign({ sub: user.id, role: user.role });
    const { password: _, ...result } = user;
    return { user: result, token };
  }
  async me(token: string) {
    try {
      const payload = this.jwt.verify(token);
      const user = await this.repo.findOneBy({ id: payload.sub });
      if (!user) throw new UnauthorizedException();
      const { password: _, ...result } = user;
      return result;
    } catch { throw new UnauthorizedException(); }
  }
}
