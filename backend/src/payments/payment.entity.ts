import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('transactions')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount: string;

  @Column()
  currency: string;

  @Column()
  method: string;

  @Column()
  status: string;

  @Column({ name: 'customer_email' })
  customerEmail: string;

  @Column({ name: 'callback_url', nullable: true })
  callbackUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
