// receipt.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptService } from './receipt.service';

describe('ReceiptService', () => {
  let service: ReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiptService], // Add other required providers
    }).compile();

    service = module.get<ReceiptService>(ReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a receipt successfully', () => {
    const result = service.generateReceipt({});

    expect(result).toEqual({
      success: true,
      message: 'Receipt generated successfully',
      data: {},
    });
  });

  it('should handle errors during receipt generation', () => {
    jest.spyOn(service, 'generateReceipt').mockImplementation(() => {
      throw new Error('Error generating receipt');
    });

    const result = service.generateReceipt({});

    expect(result).toEqual({
      success: false,
      message: 'Unexpected Failure',
      data: null,
    });
  });
});
