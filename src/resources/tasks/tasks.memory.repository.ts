import { getRepository } from 'typeorm';
import { TasksModel } from "./tasks.model";

interface ITask {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
}

const tasks: ITask[] = [];

const getAll = async (boardId: string): Promise<TasksModel[]> => {
    const tasks = await getRepository(TasksModel).find({where: {boardId}});
    return tasks;
};
const getById = async (boardId: string, taskId: string): Promise<TasksModel | undefined> => {
    const task = await getRepository(TasksModel).findOne({where: {boardId, id: taskId}});
    return task;
};
const addTask = async (task: TasksModel): Promise<TasksModel> => {
    const newTask = await getRepository(TasksModel).save(task);
    return newTask;
};
const updateTask = async (task: TasksModel): Promise<TasksModel> => {
    const updatedTask = await getRepository(TasksModel).save(task);
    return updatedTask;
};
const deleteById = async (_boardId: string, id: string): Promise<void> => {
    const removedResult = await getRepository(TasksModel).delete({id});
};

const tasksRepositoryActions = {getAll, getById, addTask, updateTask, deleteById};

export { 
    tasks, 
    ITask,
    tasksRepositoryActions 
};
