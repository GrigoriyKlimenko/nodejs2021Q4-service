import 'reflect-metadata';
import { PORT, LOG_LEVEL } from './common/config';
import app from './app';
import logger from './common/logger';
import { postgresqlConnect } from './common/dbConnect';
import { addDefaultUser } from './resources/users/user.service';


/**
   * This function initiate listen method for server
   * and catch any errors with printing in 
   * @param serverPort - param with listening port for server
*/
const start = async (serverPort: number | string) => {
  try {
    await postgresqlConnect();
    
    await app.listen(serverPort, "0.0.0.0",() => {
      logger.info(`Server is running on http://localhost:${PORT} and log-level: ${LOG_LEVEL}`)
    })

    await addDefaultUser();

  } catch (error) {
    logger.error(error);
  }
};

start(PORT);
