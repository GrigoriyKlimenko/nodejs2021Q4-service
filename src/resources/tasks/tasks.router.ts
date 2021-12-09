import { 
  getTasksSchema, 
  getOneTaskSchema, 
  addTaskSchema, 
  deleteTaskSchema, 
  updateTaskSchema, 
} from './tasks.model'

function tasksRouter (fastify, options, done) {
  fastify.get('/boards/:boardId/tasks', getTasksSchema);
  fastify.get('/boards/:boardId/tasks/:taskId', getOneTaskSchema);
  fastify.post('/boards/:boardId/tasks', addTaskSchema);
  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskSchema);
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskSchema);
  done();
}

export default tasksRouter
