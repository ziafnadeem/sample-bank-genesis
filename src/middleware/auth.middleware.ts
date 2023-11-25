import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: any, res: any, next: () => void) {
    const { email, password } = req.body;

    const user = this.authService.validateUser(email, password);

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}
