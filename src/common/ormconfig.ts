import { ConnectionOptions } from 'typeorm';
import {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_HOST
} from './config';

const config: ConnectionOptions = {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [],
    synchronize: false,
    migrations: ['./src/migrations/**/*.ts'],
    cli: {
        migrationsDir: 'src/migrations'
    }
};

export = config;