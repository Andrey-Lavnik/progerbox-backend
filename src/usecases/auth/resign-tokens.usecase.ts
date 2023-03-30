import { Injectable } from '@nestjs/common';
import { TokenPairUsecase } from '@core/abstracts/usecases';
import { Repositories } from '@frameworks/postgres/repositories';
import { Auth } from '@frameworks/auth/auth';
import { TokenPair } from '@core/common/types';

@Injectable()
export class ResignTokensUsecase implements TokenPairUsecase {
  constructor(private readonly repositories: Repositories, private readonly auth: Auth) {}

  public async execute(oldAccessToken: string, oldRefreshToken: string): Promise<TokenPair> {
    await this.auth.verifyRefreshToken(oldRefreshToken);

    let usedRefreshToken = await this.repositories.usedRefreshTokens.findOneBy({
      value: oldRefreshToken,
    });

    if (usedRefreshToken) {
      throw new Error('Refresh token already used');
    }

    usedRefreshToken = this.repositories.usedRefreshTokens.create({ value: oldRefreshToken });
    await this.repositories.usedRefreshTokens.save(usedRefreshToken);

    const accessTokenPayload = await this.auth.verifyAccessToken(oldAccessToken, {
      ignoreExpiration: true,
    });

    return {
      accessToken: await this.auth.createAccessToken({
        id: accessTokenPayload.id,
        username: accessTokenPayload.username,
        email: accessTokenPayload.email,
        role: accessTokenPayload.role,
      }),
      refreshToken: await this.auth.createRefreshToken(),
    };
  }
}
