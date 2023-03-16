import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ResourceType } from '../entities/resource.entity';
import { LanguageTag } from '../../../shared/types';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ResourceType)
  @IsNotEmpty()
  type: ResourceType;

  @IsEnum(LanguageTag)
  @IsNotEmpty()
  language: LanguageTag;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagsIds?: number[];
}
