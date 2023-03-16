import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { DiscoveryModule } from '@nestjs/core';
import { CreateResourceUsecase } from './usecases/create-resource.usecase';
import { UpdateResourceUsecase } from './usecases/update-resource.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Tag } from '../categories/entities/tag.entity';
import { GetResourcesUsecase } from './usecases/get-resources.usecase';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [DiscoveryModule, TypeOrmModule.forFeature([Resource, Tag, Category, User])],
  providers: [CreateResourceUsecase, UpdateResourceUsecase, GetResourcesUsecase, UsecasesResolver],
  controllers: [ResourcesController],
})
export class ResourcesModule {}
