import { Injectable } from '@nestjs/common';
import { CreateTagUsecase } from '@usecases/tags/create-tag.usecase';

@Injectable()
export class TagsUsecases {
  constructor(public readonly createTag: CreateTagUsecase) {}
}
