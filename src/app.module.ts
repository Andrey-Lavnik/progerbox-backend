import { Module } from '@nestjs/common';
import { AuthController } from '@controllers/auth.controller';
import { CategoriesController } from '@controllers/categories.controller';
import { ResourcesController } from '@controllers/resources.controller';
import { UsersController } from '@controllers/users.controller';
import { UsecasesModule } from '@usecases/usecases.module';

@Module({
  imports: [UsecasesModule],
  controllers: [AuthController, CategoriesController, ResourcesController, UsersController],
})
export class AppModule {}
