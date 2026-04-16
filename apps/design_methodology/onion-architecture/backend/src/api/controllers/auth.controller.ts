import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('login') login(@Body() body: { email: string; password: string }) { return this.service.login(body.email, body.password); }
  @Get('me') me(@Headers('authorization') auth: string) { return this.service.me(auth?.replace('Bearer ', '')); }
}
