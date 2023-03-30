import { Injectable } from '@nestjs/common';
import { CreateResourceUsecase } from '@usecases/resources/create-resource.usecase';
import { GetResourcesUsecase } from '@usecases/resources/get-resources.usecase';
import { UpdateResourceUsecase } from '@usecases/resources/update-resource.usecase';
import { UsecaseResolver } from '@core/abstracts/usecases';

@Injectable()
export class ResourcesUsecases extends UsecaseResolver {
  public static list = [CreateResourceUsecase, GetResourcesUsecase, UpdateResourceUsecase];

  constructor(
    public readonly createResource: CreateResourceUsecase,
    public readonly getResources: GetResourcesUsecase,
    public readonly updateResource: UpdateResourceUsecase,
  ) {
    super();
  }
}
