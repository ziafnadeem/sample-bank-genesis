import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { StripeService } from 'src/services/stripe.service';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService, StripeService],
})
export class CheckoutModule {}
