import { Injectable } from '@nestjs/common';
import { CreateUserUsecase } from '@usecases/users/create-user.usecase';
import { GetUserByIdUsecase } from '@usecases/users/get-user-by-id.usecase';
import { GetUserWithAuthUsecase } from '@usecases/users/get-user-with-auth.usecase';
import { GetUsersUsecase } from '@usecases/users/get-users.usecase';
import { UsecaseResolver } from '@core/abstracts/usecases';

@Injectable()
export class UsersUsecases extends UsecaseResolver {
  public static list = [
    CreateUserUsecase,
    GetUsersUsecase,
    GetUserByIdUsecase,
    GetUserWithAuthUsecase,
  ];

  constructor(
    public readonly createUser: CreateUserUsecase,
    public readonly getUserById: GetUserByIdUsecase,
    public readonly getUserWithAuth: GetUserWithAuthUsecase,
    public readonly getUsers: GetUsersUsecase,
  ) {
    super();
  }
}
