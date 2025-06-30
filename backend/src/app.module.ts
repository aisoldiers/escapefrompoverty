import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './payments/payments.module';
import { PaymentEntity } from './payments/payment.entity';
import { IdempotencyKeyEntity } from './payments/idempotency-key.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([PaymentEntity, IdempotencyKeyEntity]),
    PaymentsModule,
  ],
})
export class AppModule {}
