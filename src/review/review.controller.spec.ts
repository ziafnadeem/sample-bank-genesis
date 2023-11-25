import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { EmailService } from '../services/email.service';

describe('ReviewController', () => {
  let controller: ReviewController;
  let reviewService: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService, EmailService], // Add other required providers
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call postReview method of ReviewService with user email', () => {
    const postReviewSpy = jest
      .spyOn(reviewService, 'postReview')
      .mockReturnValue({
        success: true,
        message: 'Review posted successfully',
      });

    const reviewData = {}; // Provide test data
    const user = { email: 'user@example.com' }; // Provide test user

    const result = controller.postReview(reviewData, { user });

    expect(postReviewSpy).toHaveBeenCalledWith(reviewData, 'user@example.com');
    expect(result).toEqual({
      success: true,
      message: 'Review posted successfully',
    });
  });
});
