import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MultiSessionsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.user && !req.user.hasActiveSession()) {
      next();
    } else {
      return res
        .status(401)
        .json({ message: 'Multiple sessions are not allowed' });
    }
  }
}
