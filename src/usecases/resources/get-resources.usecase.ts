import { In } from 'typeorm';
import { ResourceType } from '@frameworks/postgres/entities/resource.entity';
import { LanguageTag } from '@core/common/types';
import { Usecase } from '@core/abstracts/usecases';
import { Injectable } from '@nestjs/common';
import { GetResourcesFilterDto } from '@core/dtos/resource.dto';
import { Repositories } from '@frameworks/postgres/repositories';

interface ResourceItem {
  id: number;
  name: string;
  description: string;
  type: ResourceType;
  url: string;
  language: LanguageTag;
  author: {
    id: number;
    username: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
    type: string;
  }[];
}

@Injectable()
export class GetResourcesUsecase implements Usecase {
  constructor(private readonly repositories: Repositories) {}

  public async execute(filter: GetResourcesFilterDto = {}): Promise<ResourceItem[]> {
    const resources = await this.repositories.resources.find({
      relations: ['tags', 'tags.category', 'author'],
      where: {
        authorId: filter.authorId,
        tags: {
          id: filter.tags ? In(filter.tags) : undefined,
          category: {
            id: filter.categories ? In(filter.categories) : undefined,
          },
        },
      },
    });

    const result = [];
    for (const resource of resources) {
      const obj: ResourceItem = {
        id: resource.id,
        name: resource.name,
        description: resource.description,
        type: resource.type,
        url: resource.url,
        language: resource.language,
        author: {
          id: resource.author.id,
          username: resource.author.username,
        },
        tags: [],
        categories: [],
      };
      for (const tag of resource.tags) {
        obj.tags.push({
          id: tag.id,
          name: tag.name,
        });
        obj.categories.push({
          id: tag.category.id,
          name: tag.category.name,
          type: tag.category.type,
        });
      }

      result.push(obj);
    }

    return result;
  }
}
