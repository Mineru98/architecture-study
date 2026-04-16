import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async findByEmail(email: string) { return this.repo.findOneBy({ email }) as unknown as Promise<UserEntity | null>; }
  async findById(id: string) { return this.repo.findOneBy({ id }) as unknown as Promise<UserEntity | null>; }
  async create(user: UserEntity) { return this.repo.save(this.repo.create(user)) as unknown as Promise<UserEntity>; }
  async count() { return this.repo.count(); }
}
