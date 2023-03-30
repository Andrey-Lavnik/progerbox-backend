import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Auth } from '@frameworks/auth/auth';
import { Request } from 'express';
import { COOKIE_KEY, METADATA_ROLES_KEY } from '@core/common/constants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly authService: Auth, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const roles = this.reflector.get<string[]>(METADATA_ROLES_KEY, context.getHandler());

    if (!roles?.length) return true;

    const cookie = request.signedCookies[COOKIE_KEY];

    if (!cookie) {
      throw new UnauthorizedException();
    }

    let payload;
    try {
      payload = await this.authService.verifyAccessToken(cookie.accessToken);
    } catch (e) {
      throw new UnauthorizedException();
    }

    if (!roles.includes(payload.role)) {
      throw new ForbiddenException();
    }

    return true;
  }
}
