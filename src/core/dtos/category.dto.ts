import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategoryType } from '../../frameworks/postgres/entities/category.entity';
import { PartialType } from '@nestjs/mapped-types';

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

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
