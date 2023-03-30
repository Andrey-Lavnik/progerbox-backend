import { Injectable } from '@nestjs/common';
import { Usecase } from '@core/abstracts/usecases';
import { Repositories } from '@frameworks/postgres/repositories';

interface CategoryItem {
  id: number;
  name: string;
  description: string;
  type: string;
}

@Injectable()
export class GetCategoriesUsecase implements Usecase {
  constructor(private readonly repositories: Repositories) {}

  public async execute(): Promise<CategoryItem[]> {
    const categories = await this.repositories.categories.find();
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      type: category.type,
    }));
  }
}
