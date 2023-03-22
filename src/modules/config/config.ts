import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
dotenv.config();

@Injectable()
export class Config {
  public common = {
    port: Number(process.env.PORT),
  };
  public database = {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
  };
  public security = {
    cookie: {
      key: process.env.COOKIE_SECRET_KEY as string,
    },
    accessToken: {
      key: process.env.ACCESS_TOKEN_SECRET_KEY as string,
    },
    refreshToken: {
      key: process.env.REFRESH_TOKEN_SECRET_KEY as string,
    },
  };

  constructor() {
    // If you need to rewrite config by some conditions - do it here
  }
}
