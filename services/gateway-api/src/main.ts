import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { Controller, Get, Post, Param } from '@nestjs/common';

@Controller('v1/payments')
class PaymentsController {
  @Post()
  create() {
    return { id: '1', status: 'SUCCEEDED' };
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return { id, status: 'SUCCEEDED' };
  }
}

@Module({ controllers: [PaymentsController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8000, '0.0.0.0');
}
bootstrap();
