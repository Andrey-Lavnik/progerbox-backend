import { Category } from '@frameworks/postgres/entities/category.entity';
import { OperationExceptions } from '@frameworks/exceptions/operation-exceptions';
import { Usecase } from '@core/abstracts/usecases';
import { UpdateCategoryDto } from '@core/dtos/category.dto';
import { Repositories } from '@frameworks/postgres/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCategoryUsecase implements Usecase {
  constructor(
    private readonly repositories: Repositories,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  public async execute(id: number, fields: UpdateCategoryDto): Promise<Category> {
    const category = await this.repositories.categories.findOneBy({ id });

    if (!category) {
      throw this.operationExceptions.categories.notFound({ id });
    }

    await this.repositories.categories.save({
      ...category,
      ...fields,
    });

    return category;
  }
}
