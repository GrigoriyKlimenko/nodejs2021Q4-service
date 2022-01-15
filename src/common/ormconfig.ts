import { ConnectionOptions } from 'typeorm';
import { 
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_HOST } from './config';

const config: ConnectionOptions = {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    // entities name should be **.entity.ts
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // synchronize: false,
    // migrationsRun: false,
    logging: false,
    // migrations: [__dirname + '/migrations/*{.ts,.js}'],
    // cli: {
    //     migrationsDir: 'src/database/migrations'
    // }
};

export = config;