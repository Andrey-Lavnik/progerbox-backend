import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesUsecases } from '@usecases/categories/categories-usecases';
import { CreateCategoryDto, UpdateCategoryDto } from '@core/dtos/category.dto';
import { CreateTagDto } from '@core/dtos/tag.dto';
import { Roles } from '@core/decorators/roles.decorator';
import { UserRole } from '@core/common/types';
import { TagsUsecases } from '@usecases/tags/tags-usecases';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesUsecases: CategoriesUsecases,
    private readonly tagsUsecases: TagsUsecases,
  ) {}

  @ApiOperation({ summary: 'Admin only. Create category' })
  @HttpCode(201)
  @Roles(UserRole.ADMIN)
  @Post()
  public async createCategory(@Body() fields: CreateCategoryDto): Promise<any> {
    const category = await this.categoriesUsecases.createCategory.execute(fields);
    return { category };
  }

  @ApiOperation({ summary: 'Admin only. Create tag' })
  @HttpCode(201)
  @Roles(UserRole.ADMIN)
  @Post('/tags')
  public async createTag(@Body() fields: CreateTagDto): Promise<any> {
    const tag = await this.tagsUsecases.createTag.execute(fields);
    return { tag };
  }

  @ApiOperation({ summary: 'Admin only. Update category' })
  @Roles(UserRole.ADMIN)
  @Patch('/:id')
  public async updateResource(
    @Param('id') id: number,
    @Body() fields: UpdateCategoryDto,
  ): Promise<any> {
    const category = this.categoriesUsecases.updateCategory.execute(id, fields);
    return { category };
  }

  @ApiOperation({ summary: 'Get categories' })
  @Get()
  public async getCategories(): Promise<any> {
    const categories = await this.categoriesUsecases.getCategories.execute();
    return { categories };
  }
}
