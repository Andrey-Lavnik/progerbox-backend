import { BadRequestException, Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { COOKIE_KEY } from '@core/common/constants';
import { UsersUsecases } from '@usecases/users/users-usecases';
import { LoginDto } from '@core/dtos/auth.dto';
import { AuthUsecases } from '@usecases/auth/auth-usecases';
import { TokenPair } from '@core/common/types';
import { utils } from '@core/common/utils';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersUsecases: UsersUsecases,
    private readonly authUsecases: AuthUsecases,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @Post('/login')
  public async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() fields: LoginDto,
  ): Promise<any> {
    const user = await this.usersUsecases.getUserWithAuth.execute(fields);
    const requestCookie = request.signedCookies[COOKIE_KEY];
    let tokens: TokenPair;

    if (requestCookie) {
      tokens = await this.authUsecases.resignTokens.execute(
        requestCookie.accessToken,
        requestCookie.refreshToken,
      );
    } else {
      tokens = await this.authUsecases.signTokens.execute(user);
    }

    const cookieData = await utils.buildCookie(tokens.accessToken, tokens.refreshToken);
    response.cookie(COOKIE_KEY, cookieData.value, cookieData.options);
    return { user };
  }

  @ApiOperation({ summary: 'Update tokens' })
  @Post('/tokens')
  public async updateTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const requestCookie = request.signedCookies[COOKIE_KEY];

    if (!requestCookie) {
      throw new BadRequestException();
    }

    try {
      const tokens = await this.authUsecases.resignTokens.execute(
        requestCookie.accessToken,
        requestCookie.refreshToken,
      );

      const cookieData = await utils.buildCookie(tokens.accessToken, tokens.refreshToken);
      response.cookie(COOKIE_KEY, cookieData.value, cookieData.options);
    } catch (e) {
      response.clearCookie(COOKIE_KEY);
      throw new BadRequestException();
    }

    return {};
  }
}
