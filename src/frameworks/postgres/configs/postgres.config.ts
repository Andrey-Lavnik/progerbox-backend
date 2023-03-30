import { config } from '@configuration/config';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

export const postgresConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.databaseName,
};
