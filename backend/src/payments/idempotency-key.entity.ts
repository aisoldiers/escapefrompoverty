import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('idempotency_keys')
export class IdempotencyKeyEntity {
  @PrimaryColumn({ length: 64 })
  key: string;

  @Column({ type: 'jsonb', name: 'response_json', nullable: true })
  responseJson: object | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
