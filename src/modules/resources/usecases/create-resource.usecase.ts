import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { Usecase } from '../../../libs/usecases-resolver';
import { Tag } from '../../categories/entities/tag.entity';
import { User } from '../../users/entities/user.entity';
import { OperationExceptions } from '../../exceptions/operation-exceptions';

@Usecase()
export class CreateResourceUsecase implements IUsecase {
  constructor(
    @InjectRepository(Resource)
    private readonly resourcesRepository: Repository<Resource>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  public async execute(fields: CreateResourceDto): Promise<Resource> {
    const tags = await this.tagsRepository.findBy({
      id: fields.tagsIds ? In(fields.tagsIds) : undefined,
    });

    const resource = this.resourcesRepository.create({
      ...fields,
      tags,
    });

    if (fields.authorId) {
      const user = await this.usersRepository.findOne({
        where: {
          id: fields.authorId,
        },
      });

      if (!user) {
        throw this.operationExceptions.users.notFound({ id: fields.authorId });
      }
    }

    await this.resourcesRepository.insert(resource);
    return resource;
  }
}
