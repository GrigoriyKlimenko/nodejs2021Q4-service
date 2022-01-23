import { FastifyInstance } from 'fastify'
import { IncomingMessage } from 'http'
import {
    loginSchema,
} from './login.model';

/**
   * This function initiate registration of routes for various url's
   * @param fastify - param with server
   * @param _option - optional param with options
   * @param done - callback function
*/
function loginRouter(fastify: FastifyInstance, _option: IncomingMessage, done: () => void) {
    fastify.post('/login', loginSchema);
    done();
}

export default loginRouter;
