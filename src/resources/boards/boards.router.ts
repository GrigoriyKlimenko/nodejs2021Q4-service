import { FastifyInstance } from 'fastify'
import { IncomingMessage } from 'http'
import { 
  getBoardsSchema, 
  getOneBoardSchema, 
  addBoardSchema, 
  deleteBoardSchema, 
  updateBoardSchema, 
} from './boards.model';

/**
   * This function initiate registration of routes for various url's
   * @param fastify - param with server
   * @param _option - optional param with options
   * @param done - callback function
*/
function boardsRouter (fastify: FastifyInstance, _option: IncomingMessage, done: () => void) {
  fastify.get('/boards', getBoardsSchema);
  fastify.get('/boards/:boardId', getOneBoardSchema);
  fastify.post('/boards', addBoardSchema);
  fastify.put('/boards/:boardId', updateBoardSchema);
  fastify.delete('/boards/:boardId', deleteBoardSchema);
  done();
}

export default boardsRouter;
