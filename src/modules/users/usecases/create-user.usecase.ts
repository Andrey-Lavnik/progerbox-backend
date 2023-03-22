import { IUsecase } from '../../../shared/usecase.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usecase } from '../../../libs/usecases-resolver';
import { Cryptography } from '../../cryptography/cryptography';

@Usecase()
export class CreateUserUsecase implements IUsecase {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly cryptography: Cryptography,
  ) {}

  async execute(fields: CreateUserDto): Promise<User> {
    const salt = this.cryptography.getSalt();
    const passwordHash = this.cryptography.getHash(fields.password, salt);

    const user = this.usersRepository.create({
      ...fields,
      passwordHash,
      salt,
    });
    await this.usersRepository.insert(user);
    return user;
  }
}
