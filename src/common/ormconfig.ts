import { ConnectionOptions } from 'typeorm';
import {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_HOST
} from './config';
import { UsersModel } from '../resources/users/user.model';
import { BoardsModel } from '../resources/boards/boards.model';
import { ColumnsModel } from '../resources/boards/columns.model';
import { TasksModel } from '../resources/tasks/tasks.model';

const config: ConnectionOptions = {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [UsersModel, BoardsModel, ColumnsModel, TasksModel],
    logging: false,
    synchronize: false,
    dropSchema: false,
    migrations: ['./src/migrations/**/*.ts'],
    migrationsRun: false,
    cli: {
      migrationsDir: 'src/migrations'
    }
};

export = config;