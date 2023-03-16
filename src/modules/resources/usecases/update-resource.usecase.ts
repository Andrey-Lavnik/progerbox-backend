import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';
import { OperationExceptions } from '../../exceptions/operation-exceptions';
import { Usecase } from '../../../libs/usecases-resolver';
import { UpdateResourceDto } from '../dto/update-resource.dto';
import { Tag } from '../../categories/entities/tag.entity';
import { User } from '../../users/entities/user.entity';

@Usecase()
export class UpdateResourceUsecase implements IUsecase {
  constructor(
    @InjectRepository(Resource)
    private readonly resourcesRepository: Repository<Resource>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  public async execute(id: number, fields: UpdateResourceDto): Promise<Resource> {
    const tags = await this.tagsRepository.findBy({
      id: fields.tagsIds ? In(fields.tagsIds) : undefined,
    });

    const resource = await this.resourcesRepository.findOne({
      relations: {
        tags: true,
      },
      where: { id },
    });

    if (!resource) {
      throw this.operationExceptions.resources.notFound({ id });
    }

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

    resource.tags = tags;
    await this.resourcesRepository.save({
      ...resource,
      ...fields,
    });

    return resource;
  }
}
