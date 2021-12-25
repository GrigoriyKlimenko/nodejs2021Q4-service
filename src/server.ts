import { PORT } from './common/config';
import app from './app';
import logger from './common/logger';

/**
   * This function initiate listen method for server
   * and catch any errors with printing in 
   * @param serverPort - param with listening port for server
*/
const start = async (serverPort: number | string) => {
  try {
    await app.listen(serverPort, () => {
      logger.info(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    logger.error(error);
  }
};

start(PORT);
