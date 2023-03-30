import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@core/decorators/roles.decorator';
import { Response } from 'express';
import { COOKIE_KEY } from '@core/common/constants';
import { UsersUsecases } from '@usecases/users/users-usecases';
import { CreateUserDto } from '@core/dtos/user.dto';
import { UserRole } from '@core/common/types';
import { AuthUsecases } from '@usecases/auth/auth-usecases';
import { utils } from '@core/common/utils';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersUsecases: UsersUsecases,
    private readonly authUsecases: AuthUsecases,
  ) {}

  @ApiOperation({ summary: 'Create user' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createUser(
    @Body() fields: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const user = await this.usersUsecases.createUser.execute(fields);
    const tokens = await this.authUsecases.signTokens.execute(user);

    const cookieData = await utils.buildCookie(tokens.accessToken, tokens.refreshToken);
    response.cookie(COOKIE_KEY, cookieData.value, cookieData.options);
    return { user };
  }

  @ApiOperation({ summary: 'Admin only. Get users' })
  @Roles(UserRole.ADMIN)
  @Get()
  public async getUsers(): Promise<any> {
    const users = await this.usersUsecases.getUsers.execute();
    return { users };
  }

  @ApiOperation({ summary: 'Admin only. Get user by id' })
  @Roles(UserRole.ADMIN)
  @Get('/:id')
  public async getUserById(@Param('id') id: number): Promise<any> {
    const user = await this.usersUsecases.getUserById.execute(id);
    return { user };
  }
}
