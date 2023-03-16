import { IUsecase } from '../../../shared/usecase.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Resource, ResourceType } from '../entities/resource.entity';
import { Usecase } from '../../../libs/usecases-resolver';
import { GetResourcesQueryDto } from '../dto/get-resources-query.dto';
import { Category } from '../../categories/entities/category.entity';
import { LanguageTag } from '../../../shared/types';

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

@Usecase()
export class GetResourcesUsecase implements IUsecase {
  constructor(
    @InjectRepository(Resource)
    private readonly resourcesRepository: Repository<Resource>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  public async execute(query: GetResourcesQueryDto): Promise<ResourceItem[]> {
    const resources = await this.resourcesRepository.find({
      relations: ['tags', 'tags.category', 'author'],
      where: {
        authorId: query.authorId,
        tags: {
          id: query.tags ? In(query.tags) : undefined,
          category: {
            id: query.categories ? In(query.categories) : undefined,
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
