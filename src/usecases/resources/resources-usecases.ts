import { Injectable } from '@nestjs/common';
import { CreateResourceUsecase } from '@usecases/resources/create-resource.usecase';
import { GetResourcesUsecase } from '@usecases/resources/get-resources.usecase';
import { UpdateResourceUsecase } from '@usecases/resources/update-resource.usecase';

@Injectable()
export class ResourcesUsecases {
  constructor(
    public readonly createResource: CreateResourceUsecase,
    public readonly getResources: GetResourcesUsecase,
    public readonly updateResource: UpdateResourceUsecase,
  ) {}
}
