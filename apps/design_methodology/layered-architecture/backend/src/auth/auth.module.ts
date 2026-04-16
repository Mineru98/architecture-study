import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from '../presentation/controllers/auth.controller';
import { UsersService } from '../application/services/users.service';
import { User } from '../user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ secret: 'design-methodology-secret', signOptions: { expiresIn: '24h' } })],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
