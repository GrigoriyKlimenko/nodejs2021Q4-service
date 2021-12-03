const User = require('./user.model');
const usersService = require('./user.service');

function usersRouter (fastify, options, done) {
  fastify.get('/users', (res, req) => {
    req.send('users')
  })
  fastify.get('/users/:userId', (res, req) => {
    const { userId } = req.params;
    req.send('user by id')
  })
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
