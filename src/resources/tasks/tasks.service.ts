import uuid from 'uuid';
let tasksRepo = require('./tasks.memory.repository');
interface Task {
        id: 'string';
        title: 'string';
        order: 'number';
        description: 'string';
        userId: 'string';
        boardId: 'string'; 
        columnId: 'string';
}
const getAllTasks = (req, res) => {
    res.send(tasksRepo);
};

const getOneTask = (req, res) => {
    const { taskId } = req.params;
    const task = tasksRepo.find((taskItem: Task) => taskItem.id === taskId);
    if (!task) {
        res.code(404).send('no such task');
    } else {
        res.send(task);
    }
};

const addTask = (req, res) => {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = {
        id: uuid.v4(),
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

const deleteTask = (req, res) => {
    const { taskId } = req.params;
    tasksRepo = tasksRepo.filter((task: Task) => task.id !== taskId);
    res.code(204).send();
};

const updateTask = (req, res) => {
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
    
    tasksRepo = tasksRepo.map( (task: Task) => task.id === taskId ? updatedTask : task);
    res.code(200).send(updatedTask);
};

const resetTaskExecutor = (userId) => {
    for (let i = 0; i < tasksRepo.length; i += 1) {
        if (tasksRepo[i].userId === userId) {
            tasksRepo[i].userId = null;
        }
    }
}

const deleteTaskByBoard = (boardId) => {
    tasksRepo = tasksRepo.filter( (task: Task) => task.boardId !== boardId);
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
