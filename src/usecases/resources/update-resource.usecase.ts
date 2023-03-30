import { In } from 'typeorm';
import { Resource } from '@frameworks/postgres/entities/resource.entity';
import { OperationExceptions } from '@frameworks/exceptions/operation-exceptions';
import { Injectable } from '@nestjs/common';
import { Usecase } from '@core/abstracts/usecases';
import { UpdateResourceDto } from '@core/dtos/resource.dto';
import { Repositories } from '@frameworks/postgres/repositories';

@Injectable()
export class UpdateResourceUsecase implements Usecase {
  constructor(
    private readonly repositories: Repositories,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  public async execute(id: number, fields: UpdateResourceDto): Promise<Resource> {
    const tags = await this.repositories.tags.findBy({
      id: fields.tagsIds ? In(fields.tagsIds) : undefined,
    });

    const resource = await this.repositories.resources.findOne({
      relations: {
        tags: true,
      },
      where: { id },
    });

    if (!resource) {
      throw this.operationExceptions.resources.notFound({ id });
    }

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

    resource.tags = tags;
    await this.repositories.resources.save({
      ...resource,
      ...fields,
    });

    return resource;
  }
}
