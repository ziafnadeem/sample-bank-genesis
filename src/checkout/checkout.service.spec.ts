import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { StripeService } from 'src/services/stripe.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let stripeService: StripeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckoutService, StripeService], // Add other required providers
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
    stripeService = module.get<StripeService>(StripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call createPaymentIntent method of StripeService', async () => {
    jest.spyOn(stripeService, 'createPaymentIntent').mockResolvedValue();

    const paymentDetails = {}; // Provide test data

    await service.processPayment(paymentDetails);

    expect(stripeService.createPaymentIntent).toHaveBeenCalledWith(25, '$');
  });

  it('should return success response on successful payment', async () => {
    jest.spyOn(stripeService, 'createPaymentIntent').mockResolvedValue();

    const paymentDetails = {}; // Provide test data

    const result = await service.processPayment(paymentDetails);

    expect(result).toEqual({
      success: true,
      message: 'Payment processed successfully',
      data: {},
    });
  });

  it('should return failure response on payment failure', async () => {
    jest
      .spyOn(stripeService, 'createPaymentIntent')
      .mockRejectedValue(new Error('Payment failed'));

    const paymentDetails = {}; // Provide test data

    const result = await service.processPayment(paymentDetails);

    expect(result).toEqual({
      success: false,
      message: 'Unexpected Failure',
      data: null,
    });
  });
});
