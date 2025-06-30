import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentEntity } from './payment.entity';
import { IdempotencyKeyEntity } from './idempotency-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, IdempotencyKeyEntity])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
