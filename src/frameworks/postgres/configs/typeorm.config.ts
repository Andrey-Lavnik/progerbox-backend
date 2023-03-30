import { DataSource } from 'typeorm';
import { postgresConfig } from './postgres.config';

export const AppDataSource = new DataSource({
  ...postgresConfig,
  migrationsTableName: 'Migrations',
  entities: [`./**/*.entity.ts`],
  migrations: ['./**/migrations/*.ts'],
});
