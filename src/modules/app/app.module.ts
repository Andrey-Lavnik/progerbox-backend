import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '../config/config';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ResourcesModule } from '../resources/resources.module';
import { CategoriesModule } from '../categories/categories.module';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      useFactory: (config: Config) => ({
        type: 'postgres',
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        autoLoadEntities: true,
      }),
    }),
    ConfigModule,
    ExceptionsModule,
    UsersModule,
    CategoriesModule,
    ResourcesModule,
    AuthModule,
  ],
  providers: [RolesGuard],
})
export class AppModule {}
