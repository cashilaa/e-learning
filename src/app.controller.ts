import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

// Add interface for login data
interface LoginDto {
  email: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // Add the new student login endpoint
  @Post('api/auth/signin/student')
  async studentLogin(@Body() loginData: LoginDto) {
    return this.appService.login(loginData, 'student');
  }

  // Existing Google auth routes
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req)
  }

  @Get('api/auth/google/student')
  @UseGuards(AuthGuard('google-student'))
  async googleStudentAuth(@Req() req) { }

  @Get('auth/google/student/callback')
  @UseGuards(AuthGuard('google-student'))
  googleStudentAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req)
  }
}
