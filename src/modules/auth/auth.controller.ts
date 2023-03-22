import { BadRequestException, Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { COOKIE_KEY } from '../../shared/constants';
import { LoginDto } from './dto/login.dto';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { GetUserWithAuthUsecase } from './usecases/get-user-with-auth.usecase';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usecaseResolver: UsecasesResolver) {}

  @ApiOperation({ summary: 'Login' })
  @Post('/login')
  public async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() fields: LoginDto,
  ): Promise<any> {
    const usecase = this.usecaseResolver.get<GetUserWithAuthUsecase>(GetUserWithAuthUsecase);
    const user = await usecase.execute(fields);

    const requestCookie = request.signedCookies[COOKIE_KEY];
    if (requestCookie) {
      await this.authService.dropRefreshToken(requestCookie?.refreshToken);
    }

    const cookieData = await this.authService.createCookieData({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    response.cookie(COOKIE_KEY, cookieData.value, cookieData.options);
    return { user };
  }

  @ApiOperation({ summary: 'Update tokens' })
  @Post('/tokens')
  public async updateTokens(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<any> {
    const requestCookie = request.signedCookies[COOKIE_KEY];

    if (!requestCookie) {
      throw new BadRequestException();
    }

    try {
      const cookieData = await this.authService.createResignedCookieData(
        requestCookie.accessToken,
        requestCookie.refreshToken,
      );
      response.cookie(COOKIE_KEY, cookieData.value, cookieData.options);
    } catch (e) {
      response.clearCookie(COOKIE_KEY);
      throw new BadRequestException();
    }

    return {};
  }
}
