import { Controller, Post, Body } from '@nestjs/common';
import { ReceiptService } from './receipt.service';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('generateReceipt')
  generateReceipt(@Body() receiptDetails: any) {
    return this.receiptService.generateReceipt(receiptDetails);
  }
}
