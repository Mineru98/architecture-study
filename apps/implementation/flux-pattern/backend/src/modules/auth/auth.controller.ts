import { Controller, Post, Get, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.service.login(body.email, body.password);
    if (!result) throw new UnauthorizedException('Invalid credentials');
    return result;
  }

  @Get('me')
  async me(@Headers('authorization') auth: string) {
    if (!auth) throw new UnauthorizedException();
    const token = auth.replace('Bearer ', '');
    const userId = token.split('-')[0] || 'u1';
    const user = await this.service.me(userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
