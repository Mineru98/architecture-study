import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../domain/repositories/user.repository.interface';
import { SAMPLE_USERS } from '../seed';

@Injectable()
export class AuthService {
  constructor(@Inject('IUserRepository') private readonly userRepo: IUserRepository, private readonly jwt: JwtService) {}

  async seed() {
    const count = await this.userRepo.count();
    if (count === 0) { for (const u of SAMPLE_USERS) await this.userRepo.create(u as any); }
  }

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
