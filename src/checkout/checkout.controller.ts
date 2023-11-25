import { Controller, Post, Body } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('processPayment')
  async processPayment(@Body() paymentDetails: any) {
    return await this.checkoutService.processPayment(paymentDetails);
  }
}
