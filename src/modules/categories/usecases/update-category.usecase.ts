import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Usecase } from '../../../libs/usecases-resolver';
import { OperationExceptions } from '../../exceptions/operation-exceptions';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Usecase()
export class UpdateCategoryUsecase implements IUsecase {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  public async execute(id: number, fields: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) {
      throw this.operationExceptions.categories.notFound({ id });
    }

    await this.categoriesRepository.save({
      ...category,
      ...fields,
    });

    return category;
  }
}
