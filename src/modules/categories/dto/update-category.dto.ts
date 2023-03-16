import { CategoryType } from '../entities/category.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(CategoryType)
  @IsOptional()
  type?: CategoryType;
}
