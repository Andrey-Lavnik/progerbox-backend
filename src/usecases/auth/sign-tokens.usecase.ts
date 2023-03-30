import { Injectable } from '@nestjs/common';
import { TokenPairUsecase } from '@core/abstracts/usecases';
import { Repositories } from '@frameworks/postgres/repositories';
import { AccessTokenPayload, Auth } from '@frameworks/auth/auth';
import { TokenPair } from '@core/common/types';
import { User } from '@frameworks/postgres/entities/user.entity';

@Injectable()
export class SignTokensUsecase implements TokenPairUsecase {
  constructor(private readonly repositories: Repositories, private readonly auth: Auth) {}

  public async execute(payload: User | AccessTokenPayload): Promise<TokenPair> {
    return {
      accessToken: await this.auth.createAccessToken({
        id: payload.id,
        username: payload.username,
        email: payload.email,
        role: payload.role,
      }),
      refreshToken: await this.auth.createRefreshToken(),
    };
  }
}
