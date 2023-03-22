import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryUsecase } from './usecases/create-category.usecase';
import { GetCategoriesUsecase } from './usecases/get-categories.usecase';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateTagUsecase } from './usecases/create-tag.usecase';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateCategoryUsecase } from './usecases/update-category.usecase';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly usecasesResolver: UsecasesResolver) {}

  @ApiOperation({ summary: 'Admin only. Create category' })
  @HttpCode(201)
  @Roles(UserRole.ADMIN)
  @Post()
  public async createCategory(@Body() fields: CreateCategoryDto): Promise<any> {
    const usecase = this.usecasesResolver.get<CreateCategoryUsecase>(CreateCategoryUsecase);
    const category = await usecase.execute(fields);
    return { category };
  }

  @ApiOperation({ summary: 'Admin only. Create tag' })
  @HttpCode(201)
  @Roles(UserRole.ADMIN)
  @Post('/tags')
  public async createTag(@Body() fields: CreateTagDto): Promise<any> {
    const usecase = this.usecasesResolver.get<CreateTagUsecase>(CreateTagUsecase);
    const tag = await usecase.execute(fields);
    return { tag };
  }

  @ApiOperation({ summary: 'Admin only. Update category' })
  @Roles(UserRole.ADMIN)
  @Patch('/:id')
  public async updateResource(@Param('id') id: number, @Body() fields: UpdateCategoryDto): Promise<any> {
    const usecase = this.usecasesResolver.get<UpdateCategoryUsecase>(UpdateCategoryUsecase);
    const category = await usecase.execute(id, fields);
    return { category };
  }

  @ApiOperation({ summary: 'Get categories' })
  @Get()
  public async getCategories(): Promise<any> {
    const usecase = this.usecasesResolver.get<GetCategoriesUsecase>(GetCategoriesUsecase);
    const categories = await usecase.execute();
    return { categories };
  }
}
