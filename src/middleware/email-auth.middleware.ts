import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class EmailAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.user && req.user.emailVerified) {
      next();
    } else {
      return res.status(401).json({ message: 'Email not verified' });
    }
  }
}
