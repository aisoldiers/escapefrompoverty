import { IsEmail, IsEnum, IsObject, IsString, IsUrl } from 'class-validator';

export class MoneyDto {
  @IsString()
  value: string;

  @IsString()
  currency: string;
}

export class CustomerDto {
  @IsEmail()
  email: string;
}

export class CreatePaymentDto {
  amount: MoneyDto;

  @IsEnum(['bank_transfer'])
  method: 'bank_transfer';

  @IsObject()
  customer: CustomerDto;

  @IsUrl()
  callback_url: string;
}
