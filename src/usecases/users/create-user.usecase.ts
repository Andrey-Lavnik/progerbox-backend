import { Injectable } from '@nestjs/common';
import { Usecase } from '@core/abstracts/usecases';
import { Repositories } from '@frameworks/postgres/repositories';
import { CreateUserDto } from '@core/dtos/user.dto';
import { User } from '@frameworks/postgres/entities/user.entity';
import { Cryptography } from '@frameworks/cryptography/cryptography';

@Injectable()
export class CreateUserUsecase implements Usecase {
  constructor(
    private readonly repositories: Repositories,
    private readonly cryptography: Cryptography,
  ) {}

  async execute(fields: CreateUserDto): Promise<User> {
    const salt = this.cryptography.getSalt();
    const passwordHash = this.cryptography.getHash(fields.password, salt);

    const user = this.repositories.users.create({
      ...fields,
      passwordHash,
      salt,
    });
    await this.repositories.users.insert(user);
    return user;
  }
}
