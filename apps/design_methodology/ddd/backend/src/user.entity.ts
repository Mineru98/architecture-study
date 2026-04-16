import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('uuid') id: string;
  @Column({ unique: true }) email: string;
  @Column() name: string;
  @Column() role: string;
  @Column() password: string;
  @CreateDateColumn() createdAt: Date;
}
