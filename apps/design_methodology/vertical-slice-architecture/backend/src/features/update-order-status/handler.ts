import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../order.entity';
@Injectable()
export class UpdateOrderStatusHandler {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async execute(id: string, status: string) { await this.repo.update(id, { status }); return this.repo.findOneBy({ id }); }
}
