import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // mock user
  private readonly user = {
    email: 'user@example.com',
    password: 'password123',
    emailVerified: true,
    hasActiveSession: true,
  };

  validateUser(email: string, password: string): any {
    // for demo purpose i'll be using the mock user for auth
    if (email === this.user.email && password === this.user.password) {
      return this.user;
    }
    return null;
  }
}
