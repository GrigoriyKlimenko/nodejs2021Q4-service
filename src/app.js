const fastify = require('fastify');
const usersRouter = require('./resources/users/user.router');

const app = fastify({logger:true});
app.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'fastify-service' },
    }
})
app.register(usersRouter);

module.exports = app;
