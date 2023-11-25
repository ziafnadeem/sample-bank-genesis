import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CheckoutModule } from "./checkout/checkout.module";
import { ReceiptModule } from "./receipt/receipt.module";
import { ReviewModule } from "./review/review.module";
import { EmailAuthMiddleware, MultiSessionsMiddleware } from "./middleware";
import { AuthMiddleware } from "./middleware/auth.middleware";

@Module({
  imports: [CheckoutModule, ReceiptModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // applying middleware to all routes
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
    consumer.apply(EmailAuthMiddleware, MultiSessionsMiddleware).forRoutes("*");
  }
}
