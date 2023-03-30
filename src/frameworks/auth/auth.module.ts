import { Module } from '@nestjs/common';
import { Auth } from './auth';
import { RolesGuard } from '@frameworks/auth/roles.guard';

@Module({
  providers: [Auth, RolesGuard],
  exports: [Auth, RolesGuard],
})
export class AuthModule {}
