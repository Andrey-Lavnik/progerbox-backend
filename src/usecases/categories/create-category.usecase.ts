import { Category } from '@frameworks/postgres/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { Usecase } from '@core/abstracts/usecases';
import { CreateCategoryDto } from '@core/dtos/category.dto';
import { Repositories } from '@frameworks/postgres/repositories';

@Injectable()
export class CreateCategoryUsecase implements Usecase {
  constructor(private readonly repositories: Repositories) {}

  public async execute(fields: CreateCategoryDto): Promise<Category> {
    const category = this.repositories.categories.create(fields);
    await this.repositories.categories.insert(category);
    return category;
  }
}
