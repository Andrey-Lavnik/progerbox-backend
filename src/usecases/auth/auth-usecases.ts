import { Injectable } from '@nestjs/common';
import { ResignTokensUsecase } from '@usecases/auth/resign-tokens.usecase';
import { SignTokensUsecase } from '@usecases/auth/sign-tokens.usecase';

@Injectable()
export class AuthUsecases {
  constructor(
    public readonly resignTokens: ResignTokensUsecase,
    public readonly signTokens: SignTokensUsecase,
  ) {}
}
