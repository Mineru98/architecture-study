import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../order.entity';
@Injectable()
export class GetOrderHandler {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async execute(id: string) { return this.repo.findOneBy({ id }); }
}
