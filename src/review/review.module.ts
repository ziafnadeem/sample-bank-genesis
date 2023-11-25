import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { EmailService } from 'src/services/email.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, EmailService],
})
export class ReviewModule {}
