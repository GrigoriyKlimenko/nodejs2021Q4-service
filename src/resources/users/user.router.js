const { getUsersSchema, getOneUserSchema }= require('./user.model');
const usersService = require('./user.service');

function usersRouter (fastify, options, done) {
  fastify.get('/users', getUsersSchema)
  fastify.get('/users/:userId', getOneUserSchema)
  fastify.post('/users', (res, req) => {
    req.send()
  })
  fastify.put('/users/:userId', (res, req) => {
    req.send()
  })
  fastify.delete('/users/:userId', (res, req) => {

  })
  done();
}

module.exports = usersRouter;
