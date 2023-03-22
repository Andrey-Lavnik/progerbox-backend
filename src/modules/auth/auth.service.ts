import { Injectable } from '@nestjs/common';
import { UserRole } from '../users/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { Config } from '../config/config';
import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { UsedRefreshToken } from './entities/used-refresh-token.entity';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { CookieOptions } from 'express-serve-static-core';

interface AccessTokenPayload {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

interface FullAccessTokenPayload extends AccessTokenPayload {
  iat: number;
  exp: number;
}

interface CookieData {
  value: Record<string, any>;
  options: CookieOptions;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly config: Config,
    @InjectRepository(UsedRefreshToken)
    private readonly usedRefreshTokensRepository: Repository<UsedRefreshToken>,
  ) {}

  private createJwt(payload: Record<string, any>, secret: string, options: SignOptions = {}): Promise<string> {
    return new Promise((res, rej) => {
      jwt.sign(payload, secret, options, (err, token: string) => {
        err ? rej(err) : res(token);
      });
    });
  }

  private async createAccessToken(payload: AccessTokenPayload): Promise<string> {
    return this.createJwt(payload, this.config.security.accessToken.key, {
      expiresIn: '1h',
    });
  }

  private async createRefreshToken(): Promise<string> {
    return this.createJwt({}, this.config.security.refreshToken.key, {
      expiresIn: '30d',
    });
  }

  public verifyAccessToken(token: string, options?: Omit<VerifyOptions, 'complete'>): FullAccessTokenPayload {
    return jwt.verify(token, this.config.security.accessToken.key, {
      ...options,
      complete: false,
    }) as FullAccessTokenPayload;
  }

  public verifyRefreshToken(token: string, options?: Omit<VerifyOptions, 'complete'>): Record<string, never> {
    return jwt.verify(token, this.config.security.refreshToken.key, {
      ...options,
      complete: false,
    }) as Record<string, never>;
  }

  public async dropRefreshToken(token: string): Promise<string> {
    const usedToken = this.usedRefreshTokensRepository.create({ value: token });
    const result = await this.usedRefreshTokensRepository.save(usedToken);
    return result.value;
  }

  public async createCookieData(payload: AccessTokenPayload): Promise<CookieData> {
    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken();

    return {
      value: { accessToken, refreshToken },
      options: {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        signed: true,
        expires: dayjs().add(1, 'month').toDate(),
      },
    };
  }

  public async createResignedCookieData(accessToken: string, refreshToken: string): Promise<CookieData> {
    await this.verifyRefreshToken(refreshToken);

    const usedRefreshToken = await this.usedRefreshTokensRepository.findOneBy({ value: refreshToken });
    if (usedRefreshToken) {
      throw new Error('Refresh token already used');
    }

    await this.dropRefreshToken(refreshToken);

    const payload = await this.verifyAccessToken(accessToken, {
      ignoreExpiration: true,
    });

    return this.createCookieData({
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    });
  }
}
