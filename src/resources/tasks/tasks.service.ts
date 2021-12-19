import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 } from 'uuid';
import { tasks, ITask } from './tasks.memory.repository';

type TaskRequest = FastifyRequest <{
    Params: {
        taskId: string;
        boardId: string
    }
    Body: {
        title: string;
        order: number; 
        description: string;
        userId: string | null;
        boardId: string | null; 
        columnId: string | null;
    }
}>

let tasksRepo = tasks;

/**
   * This function initiate response with all Tasks in DB and 200 status
   * @param req - optional request param
   * @param res - param for response
*/
const getAllTasks = (_req: TaskRequest, res: FastifyReply) => {
    res.send(tasksRepo);
};

/**
   * This function initiate response with Task by ID and 200 status
   * If task not founded - initiate response with 404 status and message
   * @param req - request param with taskId
   * @param res - param for response
*/
const getOneTask = (req: TaskRequest, res: FastifyReply) => {
    const { taskId } = req.params;
    const task = tasksRepo.find((taskItem: ITask) => taskItem.id === taskId);
    if (!task) {
        res.code(404).send('no such task');
    } else {
        res.send(task);
    }
};

/**
   * This function add new Task record to DB
   * and initiate response with new record and 201 status
   * @param req - request param with boardId and body with task data
   * @param res - param for response
*/
const addTask = (req: TaskRequest, res: FastifyReply) => {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = {
        id: v4(),
        title, 
        order, 
        description, 
        userId, 
        boardId, 
        columnId
    }

    tasksRepo.push(task);
    res.code(201).send(task);
};

/**
   * This function delete Task by taskId and initiate response with 204 status
   * @param req - request param with taskId
   * @param res - param for response
*/
const deleteTask = (req: TaskRequest, res: FastifyReply) => {
    const { taskId } = req.params;
    tasksRepo = tasksRepo.filter((task: ITask) => task.id !== taskId);
    res.code(204).send();
};

/**
   * This function update Task record with new params 
   * and initiate response with new record and 200 status
   * @param req - request param with taskId and body with other data
   * @param res - param for response
*/
const updateTask = (req: TaskRequest, res: FastifyReply) => {
    const { taskId } = req.params;
    const { title, order, description, userId, boardId, columnId } = req.body;
    const updatedTask = {
        id: taskId,
        title, 
        order, 
        description, 
        userId, 
        boardId, 
        columnId
    }
    
    tasksRepo = tasksRepo.map( (task: ITask) => task.id === taskId ? updatedTask : task);
    res.code(200).send(updatedTask);
};
/**
   * This function nullifies userId field in task if it user was deleted
   * @param userId - id of user wich was deleted
*/
const resetTaskExecutor = (userId: string): void => {
    for (let i = 0; i < tasksRepo.length; i += 1) {
        if (tasksRepo[i].userId === userId) {
            tasksRepo[i].userId = null;
        }
    }
}
/**
   * This function to delete task if it board was deleted
   * @param boardId - id of board wich was deleted
*/
const deleteTaskByBoard = (boardId: string): void => {
    tasksRepo = tasksRepo.filter( (task: ITask) => task.boardId !== boardId);
}

export {
    getAllTasks,
    getOneTask,
    addTask,
    deleteTask,
    updateTask,
    resetTaskExecutor,
    deleteTaskByBoard,
};
