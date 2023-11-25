import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('genesis_lab_secret_key_from_env');
  }

  async createPaymentIntent(amount: number, currency: string): Promise<string> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
    });

    return paymentIntent.client_secret;
  }
}
