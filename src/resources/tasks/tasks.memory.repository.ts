import { getRepository } from 'typeorm';
import { TasksModel } from './tasks.model';

interface ITask {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
}

const getAll = async (boardId: string): Promise<ITask[]> => {
    const tasks = await getRepository(TasksModel).find({where: {boardId}});
    return tasks;
};
const getById = async (boardId: string, taskId: string): Promise<ITask | undefined> => {
    const task = await getRepository(TasksModel).findOne({where: {boardId, id: taskId}});
    return task;
};
const addTask = async (task: ITask): Promise<ITask> => {
    const newTask = await getRepository(TasksModel).save(task);
    return newTask;
};
const updateTask = async (task: ITask): Promise<ITask> => {
    const updatedTask = await getRepository(TasksModel).save(task);
    return updatedTask;
};
const deleteById = async (_boardId: string, id: string): Promise<void> => {
    const removedResult = await getRepository(TasksModel).delete({id});
};

const tasksRepositoryActions = {getAll, getById, addTask, updateTask, deleteById};

export { 
    ITask,
    tasksRepositoryActions 
};
