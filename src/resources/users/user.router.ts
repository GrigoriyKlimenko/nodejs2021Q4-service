import { 
  getUsersSchema, 
  getOneUserSchema, 
  addUserSchema, 
  deleteUserSchema, 
  updateUserSchema, 
} from './user.model';

function usersRouter (fastify, {}, done) {
  fastify.get('/users', getUsersSchema);
  fastify.get('/users/:userId', getOneUserSchema);
  fastify.post('/users', addUserSchema);
  fastify.put('/users/:userId', updateUserSchema);
  fastify.delete('/users/:userId', deleteUserSchema);
  done();
}

export default usersRouter;
