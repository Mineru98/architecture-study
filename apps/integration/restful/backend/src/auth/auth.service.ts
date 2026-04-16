import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async login(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email, password } });
    if (!user) return null;
    const token = crypto.randomBytes(32).toString('hex');
    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
  }

  async me(userId: string) {
    const user = await this.repo.findOne({ where: { id: userId } });
    if (!user) return null;
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }

  async validateToken(userId: string) {
    return this.repo.findOne({ where: { id: userId } });
  }
}
