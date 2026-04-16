import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SAMPLE_USERS } from '../../seed';
@Injectable()
export class UsersService {
  constructor(@Inject('USER_REPO') private repo: Repository<any>) {}
  async seed() { const c = await this.repo.count(); if (c === 0) { for (const u of SAMPLE_USERS) await this.repo.save(this.repo.create(u)); } }
  async findByEmail(email: string) { return this.repo.findOneBy({ email }); }
  async findById(id: string) { return this.repo.findOneBy({ id }); }
}
