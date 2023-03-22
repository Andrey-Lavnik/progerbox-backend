import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsedRefreshToken } from './entities/used-refresh-token.entity';
import { GetUserWithAuthUsecase } from './usecases/get-user-with-auth.usecase';
import { DiscoveryModule } from '@nestjs/core';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/user.entity';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DiscoveryModule, CryptographyModule, TypeOrmModule.forFeature([UsedRefreshToken, User])],
  providers: [AuthService, GetUserWithAuthUsecase, UsecasesResolver],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
