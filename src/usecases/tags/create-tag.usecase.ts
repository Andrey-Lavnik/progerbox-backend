import { Tag } from '@frameworks/postgres/entities/tag.entity';
import { Injectable } from '@nestjs/common';
import { Usecase } from '@core/abstracts/usecases';
import { Repositories } from '@frameworks/postgres/repositories';
import { CreateTagDto } from '@core/dtos/tag.dto';

@Injectable()
export class CreateTagUsecase implements Usecase {
  constructor(private readonly repositories: Repositories) {}

  public async execute(fields: CreateTagDto): Promise<Tag> {
    const tag = this.repositories.tags.create(fields);
    await this.repositories.tags.insert(tag);
    return tag;
  }
}
