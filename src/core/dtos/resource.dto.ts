import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ResourceType } from '@frameworks/postgres/entities/resource.entity';
import { LanguageTag } from '../common/types';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { utils } from '../common/utils';

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

export class UpdateResourceDto extends PartialType(CreateResourceDto) {}

export class GetResourcesFilterDto {
  // TODO: custom decorator for such transforms
  @Transform(({ value }) => utils.toArray<string>(value).map((v) => +v))
  @IsArray()
  @IsOptional()
  @IsNumber({ allowNaN: false }, { each: true })
  categories?: number[];

  @Transform(({ value }) => utils.toArray<string>(value).map((v) => +v))
  @IsArray()
  @IsOptional()
  @IsNumber({ allowNaN: false }, { each: true })
  tags?: number[];

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber({ allowNaN: false })
  authorId?: number;
}
