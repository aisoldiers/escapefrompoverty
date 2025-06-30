import { Body, Controller, Get, Param, Post, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('v1')
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  private checkAuth(auth?: string) {
    if (auth !== 'Bearer sk_test_123') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('payments')
  async create(@Body() dto: CreatePaymentDto, @Headers('idempotency-key') idemKey: string, @Headers('authorization') auth?: string) {
    this.checkAuth(auth);
    return this.payments.create(dto, idemKey);
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
