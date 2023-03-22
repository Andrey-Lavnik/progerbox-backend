import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { COOKIE_KEY, METADATA_ROLES_KEY } from '../../../shared/constants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const roles = this.reflector.get<string[]>(METADATA_ROLES_KEY, context.getHandler());
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

    if (roles?.length && !roles.includes(payload.role)) {
      throw new ForbiddenException();
    }

    return true;
  }
}
