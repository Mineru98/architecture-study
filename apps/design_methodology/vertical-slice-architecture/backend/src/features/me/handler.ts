import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user.entity';
@Injectable()
export class MeHandler {
  constructor(@InjectRepository(User) private repo: Repository<User>, private jwt: JwtService) {}
  async execute(token: string) {
    try {
      const payload = this.jwt.verify(token);
      const user = await this.repo.findOneBy({ id: payload.sub });
      if (!user) throw new UnauthorizedException();
      const { password: _, ...result } = user;
      return result;
    } catch { throw new UnauthorizedException(); }
  }
}
