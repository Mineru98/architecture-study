import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { LoginHandler } from './features/login/handler';
import { MeHandler } from './features/me/handler';
@Controller('auth')
export class AuthController {
  constructor(private loginHandler: LoginHandler, private meHandler: MeHandler) {}
  @Post('login') login(@Body() body: { email: string; password: string }) { return this.loginHandler.execute(body.email, body.password); }
  @Get('me') me(@Headers('authorization') auth: string) { return this.meHandler.execute(auth?.replace('Bearer ', '')); }
}
