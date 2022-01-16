import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import ormconfig  from './ormconfig';
import logger from './logger';

export const postgresqlConnect = async (): Promise<Connection> => {
    try {
      const connection = await createConnection(ormconfig as ConnectionOptions);
      logger.info('DB is connected successfully');
      return connection;
    } 
    catch (err) {
      throw new Error(`
        DB connection problem. 
        Error: ${err}
      `);
    }
  };