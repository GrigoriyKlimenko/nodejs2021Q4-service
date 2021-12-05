const fastify = require('fastify');
const usersRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/boards.router');
const tasksRouter = require('./resources/tasks/tasks.router');

const app = fastify({logger:true});
app.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'fastify-service' },
    }
})

app.register(usersRouter);
app.register(boardsRouter);
app.register(tasksRouter);

module.exports = app;
