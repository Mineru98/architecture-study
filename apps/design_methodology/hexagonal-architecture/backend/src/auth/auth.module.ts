import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from '../adapters/in/controllers/auth.controller';
@Module({
  imports: [JwtModule.register({ secret: 'design-methodology-secret', signOptions: { expiresIn: '24h' } })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
