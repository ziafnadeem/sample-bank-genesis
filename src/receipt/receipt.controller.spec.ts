// receipt.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';

describe('ReceiptController', () => {
  let controller: ReceiptController;
  let receiptService: ReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptController],
      providers: [ReceiptService], // Add other required providers
    }).compile();

    controller = module.get<ReceiptController>(ReceiptController);
    receiptService = module.get<ReceiptService>(ReceiptService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call generateReceipt method of ReceiptService', () => {
    const generateReceiptSpy = jest
      .spyOn(receiptService, 'generateReceipt')
      .mockReturnValue({
        success: true,
        message: 'Receipt generated successfully',
        data: {},
      });

    const receiptDetails = {}; // Provide test data

    const result = controller.generateReceipt(receiptDetails);

    expect(generateReceiptSpy).toHaveBeenCalledWith(receiptDetails);
    expect(result).toEqual({
      success: true,
      message: 'Receipt generated successfully',
      data: {},
    });
  });
});
