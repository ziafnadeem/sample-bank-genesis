import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { StripeService } from 'src/services/stripe.service';

describe('CheckoutController', () => {
  let controller: CheckoutController;
  let checkoutService: CheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [CheckoutService, StripeService], // Add other required providers
    }).compile();

    controller = module.get<CheckoutController>(CheckoutController);
    checkoutService = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call processPayment method of CheckoutService', async () => {
    jest.spyOn(checkoutService, 'processPayment').mockResolvedValue({
      success: true,
      message: 'Payment processed successfully',
      data: {},
    });

    const paymentDetails = {}; // Provide test data

    const result = await controller.processPayment(paymentDetails);

    expect(result).toEqual({
      success: true,
      message: 'Payment processed successfully',
      data: {},
    });
  });
});
