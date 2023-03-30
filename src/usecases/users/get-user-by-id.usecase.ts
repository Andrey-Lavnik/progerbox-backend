import { Injectable } from '@nestjs/common';
import { Usecase } from '@core/abstracts/usecases';
import { OperationExceptions } from '@frameworks/exceptions/operation-exceptions';
import { User } from '@frameworks/postgres/entities/user.entity';
import { Repositories } from '@frameworks/postgres/repositories';

@Injectable()
export class GetUserByIdUsecase implements Usecase {
  constructor(
    private readonly repositories: Repositories,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  async execute(id: number): Promise<User> {
    const user = await this.repositories.users.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw this.operationExceptions.users.notFound({ id });
    }

    return user;
  }
}
