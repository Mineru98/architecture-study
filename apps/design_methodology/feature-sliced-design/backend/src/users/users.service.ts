import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { SAMPLE_USERS } from '../seed';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async seed() {
    const count = await this.repo.count();
    if (count === 0) {
      for (const u of SAMPLE_USERS) await this.repo.save(this.repo.create(u));
    }
  }

  async findByEmail(email: string) { return this.repo.findOneBy({ email }); }
  async findById(id: string) { return this.repo.findOneBy({ id }); }
}
