import { Injectable } from '@nestjs/common';
import { ResignTokensUsecase } from '@usecases/auth/resign-tokens.usecase';
import { SignTokensUsecase } from '@usecases/auth/sign-tokens.usecase';
import { UsecaseResolver } from '@core/abstracts/usecases';

@Injectable()
export class AuthUsecases extends UsecaseResolver {
  public static list = [ResignTokensUsecase, SignTokensUsecase];

  constructor(
    public readonly resignTokens: ResignTokensUsecase,
    public readonly signTokens: SignTokensUsecase,
  ) {
    super();
  }
}
