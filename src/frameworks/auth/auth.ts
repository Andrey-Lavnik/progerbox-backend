import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from '@configuration/config';
import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { UserRole } from '@core/common/types';

export interface AccessTokenPayload {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface FullAccessTokenPayload extends AccessTokenPayload {
  iat: number;
  exp: number;
}

@Injectable()
export class Auth {
  private async createJwt(
    payload: Record<string, any>,
    secret: string,
    options: SignOptions = {},
  ): Promise<string> {
    return new Promise((res, rej) => {
      jwt.sign(payload, secret, options, (err, token: string) => {
        err ? rej(err) : res(token);
      });
    });
  }

  public async createAccessToken(payload: AccessTokenPayload): Promise<string> {
    return this.createJwt(payload, config.security.accessToken.key, {
      expiresIn: '1h',
    });
  }

  public async createRefreshToken(): Promise<string> {
    return this.createJwt({}, config.security.refreshToken.key, {
      expiresIn: '30d',
    });
  }

  public verifyAccessToken(
    token: string,
    options?: Omit<VerifyOptions, 'complete'>,
  ): FullAccessTokenPayload {
    return jwt.verify(token, config.security.accessToken.key, {
      ...options,
      complete: false,
    }) as FullAccessTokenPayload;
  }

  public verifyRefreshToken(
    token: string,
    options?: Omit<VerifyOptions, 'complete'>,
  ): Record<string, never> {
    return jwt.verify(token, config.security.refreshToken.key, {
      ...options,
      complete: false,
    }) as Record<string, never>;
  }
}
