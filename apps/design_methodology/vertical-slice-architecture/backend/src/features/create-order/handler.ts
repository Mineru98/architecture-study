import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../../order.entity';
@Injectable()
export class CreateOrderHandler {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async execute(userId: string, items: any[]) {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return this.repo.save(this.repo.create({ id: uuidv4(), userId, items, total, status: 'pending' }));
  }
}
