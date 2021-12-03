const fastify = require('fastify');
const usersRouter = require('./resources/users/user.router');

const app = fastify({logger:true});
app.register(usersRouter);

module.exports = app;
