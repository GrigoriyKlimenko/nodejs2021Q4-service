import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import { 
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT } from './src/common/config';

const config: ConnectionOptions = {
    type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: false,
      migrationsRun: true,
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
};

export = config;