import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentEntity } from './payment.entity';
import { IdempotencyKeyEntity } from './idempotency-key.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private payments: Repository<PaymentEntity>,
    @InjectRepository(IdempotencyKeyEntity)
    private idemRepo: Repository<IdempotencyKeyEntity>,
  ) {}

  async create(data: CreatePaymentDto, idemKey?: string) {
    if (idemKey) {
      const prev = await this.idemRepo.findOne({ where: { key: idemKey } });
      if (prev) return prev.responseJson;
    }
    const tx = await this.payments.save(
      this.payments.create({
        amount: data.amount.value,
        currency: data.amount.currency,
        method: data.method,
        status: 'PENDING',
        customerEmail: data.customer.email,
        callbackUrl: data.callback_url,
      }),
    );
    const response = {
      ...data,
      id: tx.id,
      status: tx.status,
      created_at: tx.createdAt.toISOString(),
      bank_account: { account_number: '1234567890', bank_name: 'Mock Bank' },
    };
    if (idemKey) {
      await this.idemRepo.save({ key: idemKey, responseJson: response });
    }
    return response;
  }

  findOne(id: string) {
    return this.payments.findOne({ where: { id } });
  }

  async succeed(id: string) {
    await this.payments.update({ id }, { status: 'SUCCEEDED' });
  }
}
