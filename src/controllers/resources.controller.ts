import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateResourceDto,
  GetResourcesFilterDto,
  UpdateResourceDto,
} from '@core/dtos/resource.dto';
import { UserRole } from '@core/common/types';
import { Roles } from '@core/decorators/roles.decorator';
import { ResourcesUsecases } from '@usecases/resources/resources-usecases';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesUsecases: ResourcesUsecases) {}

  @ApiOperation({ summary: 'Admin only. Create resource' })
  @HttpCode(201)
  @Roles(UserRole.ADMIN)
  @Post()
  public async createResource(@Body() fields: CreateResourceDto): Promise<any> {
    const resource = await this.resourcesUsecases.createResource.execute(fields);
    return { resource };
  }

  @ApiOperation({ summary: 'Admin only. Update resource' })
  @Roles(UserRole.ADMIN)
  @Patch('/:id')
  public async updateResource(
    @Param('id') id: number,
    @Body() fields: UpdateResourceDto,
  ): Promise<any> {
    const resource = await this.resourcesUsecases.updateResource.execute(id, fields);
    return { resource };
  }

  @ApiOperation({ summary: 'Get resources with tags and categories' })
  @Get()
  public async getResources(@Query() filter: GetResourcesFilterDto): Promise<any> {
    const result = await this.resourcesUsecases.getResources.execute(filter);
    return { result };
  }
}
