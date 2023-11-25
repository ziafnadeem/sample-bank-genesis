import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { EmailService } from '../services/email.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService, EmailService], // Add other required providers
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should store a review and send a booking completed email', () => {
    const sendBookingCompletedEmailSpy = jest.spyOn(
      emailService,
      'sendBookingCompletedEmail',
    );

    const result = service.postReview({}, 'genesisLab@gmail.com');

    expect(result).toEqual({
      success: true,
      message: 'Review posted successfully',
    });

    expect(sendBookingCompletedEmailSpy).toHaveBeenCalledWith(
      'genesisLab@gmail.com',
    );
  });

  it('should handle errors during review posting', () => {
    jest.spyOn(service, 'postReview').mockImplementation(() => {
      throw new Error('Error posting review');
    });

    const result = service.postReview({}, 'genesisLab@gmail.com');

    expect(result).toEqual({
      success: false,
      message: 'Unexpected Failure',
    });
  });
});
