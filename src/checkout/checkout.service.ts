import { Injectable, Logger } from '@nestjs/common';
import { StripeService } from 'src/services/stripe.service';

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);
  constructor(private readonly stripeService: StripeService) {}

  async processPayment(paymentDetails: any): Promise<{
    success: boolean;
    message: string;
    data;
  }> {
    const paymentResponse = {};
    try {
      //use a transaction here using the ORM that is managing the database
      //process payment by using api like stripe etc
      await this.stripeService.createPaymentIntent(25, '$');
      this.logger.log('Payment approved');
    } catch (error) {
      //log the error for debugging purpose
      this.logger.error(
        `Error processing payment: ${error.message}`,
        error.stack,
        'CheckoutService',
      );

      return {
        success: false,
        message: 'Unexpected Failure',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Payment processed successfully',
      data: paymentResponse,
    };
  }
}
