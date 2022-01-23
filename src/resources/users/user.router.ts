import { FastifyInstance } from 'fastify'
import { IncomingMessage } from 'http'
import {
    getUsersSchema,
    getOneUserSchema,
    addUserSchema,
    deleteUserSchema,
    updateUserSchema,
} from './user.model';

/**
   * This function initiate registration of routes for various url's
   * @param fastify - param with server
   * @param _option - optional param with options
   * @param done - callback function
*/
function usersRouter(fastify: FastifyInstance, _option: IncomingMessage, done: () => void) {
    fastify.get('/users', getUsersSchema);
    fastify.get('/users/:userId', getOneUserSchema);
    fastify.post('/users', addUserSchema);
    fastify.put('/users/:userId', updateUserSchema);
    fastify.delete('/users/:userId', deleteUserSchema);
    done();
}

export default usersRouter;
