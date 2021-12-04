const { 
  getUsersSchema, 
  getOneUserSchema, 
  addUserSchema, 
  deleteUserSchema, 
  updateUserSchema, 
}= require('./user.model');

const usersService = require('./user.service');

function usersRouter (fastify, options, done) {
  fastify.get('/users', getUsersSchema);
  fastify.get('/users/:userId', getOneUserSchema);
  fastify.post('/users', addUserSchema);
  fastify.put('/users/:userId', updateUserSchema);
  fastify.delete('/users/:userId', deleteUserSchema);
  done();
}

module.exports = usersRouter;
