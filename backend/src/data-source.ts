import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PaymentEntity } from './payments/payment.entity';
import { IdempotencyKeyEntity } from './payments/idempotency-key.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [PaymentEntity, IdempotencyKeyEntity],
  migrations: ['dist/migrations/*.js'],
});

export default AppDataSource;
