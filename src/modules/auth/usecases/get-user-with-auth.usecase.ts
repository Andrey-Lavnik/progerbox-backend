import { Usecase } from '../../../libs/usecases-resolver';
import { IUsecase } from '../../../shared/usecase.interface';
import { LoginDto } from '../dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Cryptography } from '../../cryptography/cryptography';
import { OperationExceptions } from '../../exceptions/operation-exceptions';

interface PublicUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

@Usecase()
export class GetUserWithAuthUsecase implements IUsecase {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly cryptography: Cryptography,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  async execute(fields: LoginDto): Promise<PublicUser> {
    const user = await this.usersRepository.findOneBy([{ username: fields.login }, { email: fields.login }]);
    if (!user) throw this.operationExceptions.users.invalidLogin({ login: fields.login });

    const isPasswordCorrect = this.cryptography.getHash(fields.password, user.salt) === user.passwordHash;
    if (!isPasswordCorrect) throw this.operationExceptions.users.invalidPassword();

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}
