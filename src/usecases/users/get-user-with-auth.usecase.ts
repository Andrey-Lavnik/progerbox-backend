import { Cryptography } from '@frameworks/cryptography/cryptography';
import { OperationExceptions } from '@frameworks/exceptions/operation-exceptions';
import { Injectable } from '@nestjs/common';
import { Usecase } from '@core/abstracts/usecases';
import { LoginDto } from '@core/dtos/auth.dto';
import { Repositories } from '@frameworks/postgres/repositories';
import { AccessTokenPayload } from '@frameworks/auth/auth';

@Injectable()
export class GetUserWithAuthUsecase implements Usecase {
  constructor(
    private readonly repositories: Repositories,
    private readonly cryptography: Cryptography,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  async execute(fields: LoginDto): Promise<AccessTokenPayload> {
    const user = await this.repositories.users.findOneBy([
      { username: fields.login },
      { email: fields.login },
    ]);
    if (!user) throw this.operationExceptions.users.invalidLogin({ login: fields.login });

    const isPasswordCorrect =
      this.cryptography.getHash(fields.password, user.salt) === user.passwordHash;
    if (!isPasswordCorrect) throw this.operationExceptions.users.invalidPassword();

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}
