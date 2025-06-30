import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Prisma, Decimal } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePaymentDto) {
    const tx = await this.prisma.transaction.create({
      data: {
        amount: new Decimal(data.amount.value),
        currency: data.amount.currency,
        status: 'PENDING',
        customer_email: data.customer.email,
      },
    });
    return tx;
  }

  findOne(id: string) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  succeed(id: string) {
    return this.prisma.transaction.update({
      where: { id },
      data: { status: 'SUCCEEDED' },
    });
  }
}
