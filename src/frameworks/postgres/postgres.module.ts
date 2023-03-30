import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './configs/postgres.config';
import { Repositories } from './repositories';
import { Category } from '@frameworks/postgres/entities/category.entity';
import { Resource } from '@frameworks/postgres/entities/resource.entity';
import { Tag } from '@frameworks/postgres/entities/tag.entity';
import { UsedRefreshToken } from '@frameworks/postgres/entities/used-refresh-token.entity';
import { User } from '@frameworks/postgres/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...postgresConfig, autoLoadEntities: true }),
    TypeOrmModule.forFeature([Category, Resource, Tag, UsedRefreshToken, User]),
  ],
  providers: [Repositories],
  exports: [Repositories],
})
export class PostgresModule {}
