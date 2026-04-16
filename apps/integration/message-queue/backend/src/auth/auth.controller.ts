import { Controller, Post, Get, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.service.login(body.email, body.password);
    if (!result) throw new UnauthorizedException({ error: 'Unauthorized', message: 'Invalid credentials', statusCode: 401 });
    return { data: result, statusCode: 200 };
  }

  @Get('me')
  async me(@Headers('authorization') auth: string) {
    if (!auth) throw new UnauthorizedException({ error: 'Unauthorized', message: 'No token', statusCode: 401 });
    const token = auth.replace('Bearer ', '');
    const userId = token.split('-')[0] || 'u1';
    const user = await this.service.me(userId);
    if (!user) throw new UnauthorizedException();
    return { data: user, statusCode: 200 };
  }
}
