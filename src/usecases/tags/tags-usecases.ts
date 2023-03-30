import { Injectable } from '@nestjs/common';
import { CreateTagUsecase } from '@usecases/tags/create-tag.usecase';
import { UsecaseResolver } from '@core/abstracts/usecases';

@Injectable()
export class TagsUsecases extends UsecaseResolver {
  public static list = [CreateTagUsecase];

  constructor(public readonly createTag: CreateTagUsecase) {
    super();
  }
}
