import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '../services/email.service';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);
  constructor(private readonly emailService: EmailService) {}

  postReview(reviewData, email): { success: boolean; message: string } {
    try {
      //store the review in db

      this.logger.log('Review stored successfully', 'ReviewService');
      this.emailService.sendBookingCompletedEmail(email);
    } catch (error) {
      //log the error for debugging purpose
      this.logger.error(
        `Error posting review: ${error.message}`,
        error.stack,
        'ReviewService',
      );

      return { success: false, message: 'Unexpected Failure' };
    }

    return { success: true, message: 'Review posted successfully' };
  }
}
