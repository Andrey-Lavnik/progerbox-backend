import { In } from 'typeorm';
import { Resource } from '@frameworks/postgres/entities/resource.entity';
import { OperationExceptions } from '@frameworks/exceptions/operation-exceptions';
import { Repositories } from '@frameworks/postgres/repositories';
import { Injectable } from '@nestjs/common';
import { Usecase } from '@core/abstracts/usecases';
import { CreateResourceDto } from '@core/dtos/resource.dto';

@Injectable()
export class CreateResourceUsecase implements Usecase {
  constructor(
    private readonly repositories: Repositories,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  public async execute(fields: CreateResourceDto): Promise<Resource> {
    const tags = await this.repositories.tags.findBy({
      id: fields.tagsIds ? In(fields.tagsIds) : undefined,
    });

    const resource = this.repositories.resources.create({
      ...fields,
      tags,
    });

    if (fields.authorId) {
      const user = await this.repositories.users.findOne({
        where: {
          id: fields.authorId,
        },
      });

      if (!user) {
        throw this.operationExceptions.users.notFound({ id: fields.authorId });
      }
    }

    await this.repositories.resources.insert(resource);
    return resource;
  }
}
