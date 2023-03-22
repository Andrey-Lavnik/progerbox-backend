import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUsecase } from './usecases/create-user.usecase';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserByIdUsecase } from './usecases/get-user-by-id.usecase';
import { GetUsersUsecase } from './usecases/get-users.usecase';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { COOKIE_KEY } from '../../shared/constants';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usecasesResolver: UsecasesResolver, private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create user' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createUser(@Body() fields: CreateUserDto, @Res({ passthrough: true }) response: Response): Promise<any> {
    const usecase = this.usecasesResolver.get<CreateUserUsecase>(CreateUserUsecase);
    const user = await usecase.execute(fields);

    const cookieData = await this.authService.createCookieData({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    response.cookie(COOKIE_KEY, cookieData.value, cookieData.options);
    return { user };
  }

  @ApiOperation({ summary: 'Admin only. Get users' })
  @Roles(UserRole.ADMIN)
  @Get()
  public async getUsers(): Promise<any> {
    const usecase = this.usecasesResolver.get<GetUsersUsecase>(GetUsersUsecase);
    const users = await usecase.execute();
    return { users };
  }

  @ApiOperation({ summary: 'Admin only. Get user by id' })
  @Roles(UserRole.ADMIN)
  @Get('/:id')
  public async getUserById(@Param('id') id: number): Promise<any> {
    const usecase = this.usecasesResolver.get<GetUserByIdUsecase>(GetUserByIdUsecase);
    const user = await usecase.execute(id);
    return { user };
  }
}
