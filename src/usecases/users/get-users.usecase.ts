import { Injectable } from '@nestjs/common';
import { Usecase } from '@core/abstracts/usecases';
import { Repositories } from '@frameworks/postgres/repositories';
import { User } from '@frameworks/postgres/entities/user.entity';

@Injectable()
export class GetUsersUsecase implements Usecase {
  constructor(private readonly repositories: Repositories) {}

  async execute(): Promise<User[]> {
    return await this.repositories.users.find();
  }
}
