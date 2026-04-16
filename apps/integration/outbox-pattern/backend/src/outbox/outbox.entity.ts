import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OutboxMessage {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  aggregateType: string;

  @Column()
  aggregateId: string;

  @Column()
  eventType: string;

  @Column('jsonb')
  payload: any;

  @Column({ default: 'pending' })
  status: 'pending' | 'processing' | 'processed' | 'failed';

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  processedAt: Date;

  @Column({ nullable: true })
  error: string;
}
