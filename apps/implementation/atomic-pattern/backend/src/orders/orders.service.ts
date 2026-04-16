import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(token: string): Promise<Order[]> {
    const decoded = this.jwtService.decode(token) as any;
    if (!decoded?.sub) return [];
    return this.orderRepo.find({ where: { userId: decoded.sub } });
  }

  async findOne(id: string): Promise<Order> {
    return this.orderRepo.findOneByOrFail({ id });
  }

  async create(token: string, dto: CreateOrderDto): Promise<Order> {
    const decoded = this.jwtService.decode(token) as any;
    const userId = decoded?.sub || 'anonymous';

    const total = dto.items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    const order = this.orderRepo.create({
      userId,
      items: dto.items,
      total,
      status: 'pending',
    });
    return this.orderRepo.save(order);
  }
}
