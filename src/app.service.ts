import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordUtils } from './password.utils';
import { config } from 'dotenv';

config();

@Injectable()
export class AppService {
  // This would typically come from your database
  private readonly mockUsers = [
    {
      email: 'student@example.com',
      // This is just for demonstration. In reality, you'd store hashed passwords in your database
      passwordHash: '$2b$10$YourHashedPasswordHere',
      role: 'student'
    },
    // Add more mock users as needed
  ];

  constructor(private jwtService: JwtService) {}

  async login(loginData: any, userType: string) {
    try {
      const { email, password } = loginData;
      
      if (!email || !password) {
        throw new UnauthorizedException('Email and password are required');
      }

      // In reality, you would:
      // 1. Fetch user from database by email
      const user = this.mockUsers.find(u => u.email === email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // 2. Verify password
      const isPasswordValid = await PasswordUtils.comparePassword(password, user.passwordHash);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // 3. Check if user type matches
      if (user.role !== userType) {
        throw new UnauthorizedException('Invalid user type');
      }

      // Generate JWT token
      const token = this.jwtService.sign(
        {
          email: user.email,
          role: user.role,
          sub: email // In reality, this would be the user's ID
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRATION
        }
      );

      return {
        token,
        user: {
          email: user.email,
          role: user.role
        }
      };
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Invalid credentials');
    }
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const token = this.jwtService.sign(
      {
        email: req.user.email,
        role: req.user.role,
        sub: req.user.email
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION
      }
    );

    return {
      message: 'User Info from Google',
      user: req.user,
      token
    };
  }
}