import fastify from 'fastify';
import logger from './common/logger';
import usersRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/boards.router';
import tasksRouter from './resources/tasks/tasks.router';


const app = fastify({logger: logger});

app.register(usersRouter);
app.register(boardsRouter);
app.register(tasksRouter);

export default app;
