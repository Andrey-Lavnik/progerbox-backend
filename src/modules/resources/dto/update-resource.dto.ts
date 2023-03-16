import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ResourceType } from '../entities/resource.entity';
import { LanguageTag } from '../../../shared/types';

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ResourceType)
  type?: ResourceType;

  @IsOptional()
  @IsEnum(LanguageTag)
  language?: LanguageTag;

  @IsOptional()
  @IsNumber()
  authorId?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  tagsIds?: number[];
}
