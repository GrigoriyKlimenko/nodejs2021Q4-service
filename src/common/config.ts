import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const PORT = process.env.PORT || 4000;
export const {NODE_ENV} = process.env;
export const {JWT_SECRET_KEY} = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
export const LOG_LEVEL = process.env.LOG_LEVEL || '4';
export const POSTGRES_PORT: number = parseInt(<string>process.env.POSTGRES_PORT, 10) || 5432
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const PGDATA = process.env.PGDATA;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;