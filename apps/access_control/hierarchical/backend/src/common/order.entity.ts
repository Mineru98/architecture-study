import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

@Entity()
export class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('jsonb')
  items: OrderItem[];

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
