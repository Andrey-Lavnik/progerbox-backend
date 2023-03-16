import { CategoryType } from '../entities/category.entity';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(CategoryType)
  @IsNotEmpty()
  type: CategoryType;
}
