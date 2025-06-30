import { Body, Controller, Get, Param, Post, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Controller('v1')
export class PaymentsController {
  constructor(private payments: PaymentsService, private prisma: PrismaService) {}

  private checkAuth(auth?: string) {
    if (auth !== 'Bearer sk_test_123') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('payments')
  async create(@Body() dto: CreatePaymentDto, @Headers('idempotency-key') idemKey: string, @Headers('authorization') auth?: string) {
    this.checkAuth(auth);
    if (idemKey) {
      const prev = await this.prisma.idempotencyKey.findUnique({ where: { key: idemKey } });
      if (prev) return prev.response_json;
    }
    const tx = await this.payments.create(dto);
    const response = { ...dto, id: tx.id, status: tx.status, created_at: tx.created_at.toISOString(), bank_account: { account_number: '1234567890', bank_name: 'Mock Bank' } };
    if (idemKey) {
      await this.prisma.idempotencyKey.create({ data: { key: idemKey, response_json: response as any } });
    }
    return response;
  }

  @Get('payments/:id')
  findOne(@Param('id') id: string, @Headers('authorization') auth?: string) {
    this.checkAuth(auth);
    return this.payments.findOne(id);
  }

  @Post('testhelpers/payments/:id/succeed')
  async succeed(@Param('id') id: string) {
    await this.payments.succeed(id);
  }
}
