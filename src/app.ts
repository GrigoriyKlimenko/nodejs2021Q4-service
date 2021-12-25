import fastify from 'fastify';
import logger from './common/logger';
import usersRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/boards.router';
import tasksRouter from './resources/tasks/tasks.router';


const app = fastify({logger: logger});
app.addHook('preHandler', function (req, _res, done) {
    if (req.body) {
      req.log.info({ body: req.body }, 'parsed body')
    }
    if (req.params) {
        req.log.info({ params: req.params }, 'params')
    }
    if (req.query) {
        req.log.info({ query: req.query }, 'query')
    }
    done()
  })
app.register(usersRouter);
app.register(boardsRouter);
app.register(tasksRouter);

export default app;
