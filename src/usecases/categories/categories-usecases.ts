import { Injectable } from '@nestjs/common';
import { CreateCategoryUsecase } from '@usecases/categories/create-category.usecase';
import { GetCategoriesUsecase } from '@usecases/categories/get-categories.usecase';
import { UpdateCategoryUsecase } from '@usecases/categories/update-category.usecase';

@Injectable()
export class CategoriesUsecases {
  constructor(
    public readonly createCategory: CreateCategoryUsecase,
    public readonly getCategories: GetCategoriesUsecase,
    public readonly updateCategory: UpdateCategoryUsecase,
  ) {}
}
