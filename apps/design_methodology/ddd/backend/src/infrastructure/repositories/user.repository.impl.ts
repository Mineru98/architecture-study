import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user.entity';
import { IUserRepository } from '../../domain/user/user.repository';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}
  async findByEmail(email: string) { return this.repo.findOneBy({ email }); }
  async findById(id: string) { return this.repo.findOneBy({ id }); }
  async save(user: any) { return this.repo.save(this.repo.create(user)); }
  async count() { return this.repo.count(); }
}
