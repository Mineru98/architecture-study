import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('jsonb')
  items: any[];

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
