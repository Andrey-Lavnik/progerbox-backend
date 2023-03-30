import { Module } from '@nestjs/common';
import { CategoriesUsecases } from '@usecases/categories/categories-usecases';
import { ResourcesUsecases } from '@usecases/resources/resources-usecases';
import { TagsUsecases } from '@usecases/tags/tags-usecases';
import { UsersUsecases } from '@usecases/users/users-usecases';
import { AuthUsecases } from '@usecases/auth/auth-usecases';
import { PostgresModule } from '@frameworks/postgres/postgres.module';
import { ExceptionsModule } from '@frameworks/exceptions/exceptions.module';
import { AuthModule } from '@frameworks/auth/auth.module';
import { CryptographyModule } from '@frameworks/cryptography/cryptography.module';

const usecaseResolvers = [
  CategoriesUsecases,
  ResourcesUsecases,
  TagsUsecases,
  UsersUsecases,
  AuthUsecases,
];

@Module({
  imports: [PostgresModule, ExceptionsModule, AuthModule, CryptographyModule],
  providers: [
    ...usecaseResolvers,
    ...usecaseResolvers.reduce((acc, resolver) => [...acc, ...resolver.list], []),
  ],
  exports: usecaseResolvers,
})
export class UsecasesModule {}
