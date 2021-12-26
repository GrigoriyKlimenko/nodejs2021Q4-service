import fastify from 'fastify';
import logger from './common/logger';
import usersRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/boards.router';
import tasksRouter from './resources/tasks/tasks.router';


const app = fastify({ logger });

app.addHook('preHandler', (req, _res, done) => {
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

app.setErrorHandler((err, _req, res): void => {
    logger.error(err);
    res.status(err.statusCode || 500).send(err);
});

process.on('uncaughtException', (err, origin) => {
    logger.fatal(`Caught exception: ${err}. Exception origin: ${origin}`);
    setTimeout(() => {
        process.exit(1);
    }, 500)
});

process.on('unhandledRejection', (reason, promise) => {
    logger.fatal(`Unhandled Rejection at: ${promise}. Reason: ${reason}`);
    setTimeout(() => {
        process.exit(1);
    }, 500)
});
app.register(usersRouter);
app.register(boardsRouter);
app.register(tasksRouter);


// Test debug tipe logging
logger.debug('Debug message');

// Test warn tipe logging
logger.warn('Warn message');

// Test uncaught exception
// throw Error('Oops!');

// Test unhandled rejection
// Promise.reject(Error('Oops!'));

export default app;
