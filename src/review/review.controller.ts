import { Controller, Post, Body, Req } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post('postReview')
  postReview(@Body() reviewData, @Req() req: any) {
    const user = req.user;

    const email = user.email;
    return this.reviewService.postReview(reviewData, email);
  }
}
