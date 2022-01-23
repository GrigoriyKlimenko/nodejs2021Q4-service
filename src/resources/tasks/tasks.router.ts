import { FastifyInstance } from 'fastify'
import { IncomingMessage } from 'http'
import {
    getTasksSchema,
    getOneTaskSchema,
    addTaskSchema,
    deleteTaskSchema,
    updateTaskSchema,
} from './tasks.model'

/**
   * This function initiate registration of routes for various url's
   * @param fastify - param with server
   * @param _option - optional param with options
   * @param done - callback function
*/
function tasksRouter(fastify: FastifyInstance, _option: IncomingMessage, done: () => void) {
    fastify.get('/boards/:boardId/tasks', getTasksSchema);
    fastify.get('/boards/:boardId/tasks/:taskId', getOneTaskSchema);
    fastify.post('/boards/:boardId/tasks', addTaskSchema);
    fastify.put('/boards/:boardId/tasks/:taskId', updateTaskSchema);
    fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskSchema);
    done();
}

export default tasksRouter
