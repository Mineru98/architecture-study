import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user.entity';
@Injectable()
export class LoginHandler {
  constructor(@InjectRepository(User) private repo: Repository<User>, private jwt: JwtService) {}
  async execute(email: string, password: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user || user.password !== password) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwt.sign({ sub: user.id, role: user.role });
    const { password: _, ...result } = user;
    return { user: result, token };
  }
}
