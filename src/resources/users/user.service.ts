import uuid from 'uuid';
import { resetTaskExecutor } from '../tasks/tasks.service';
import {users, IUser} from './user.memory.repository';

let usersRepo = users;

const getAllUsers = (_req, res) => {
    res.send(usersRepo);
};

const getOneUser = (req, res) => {
    const { userId } = req.params;
    const user = usersRepo.find((userItem: IUser) => userItem.id === userId);
    res.send(user);
};

const addUser = (req, res) => {
    const { name, login, password } = req.body;
    const user: IUser = {
        id: uuid.v4(),
        name,
        login,
        password
    }

    usersRepo.push(user);
    res.code(201).send(user);
};

const deleteUser = (req, res) => {
    const { userId } = req.params;
    usersRepo = usersRepo.filter((user) => user.id !== userId);
    resetTaskExecutor(userId);
    res.code(204).send();
};

const updateUser = (req, res) => {
    const { userId } = req.params;
    const { name, login, password } = req.body;
    const updatedUser = {
        id: userId,
        name,
        login,
        password
    }
    
    usersRepo = usersRepo.map( user => user.id === userId ? updatedUser : user);
    res.code(200).send(updatedUser);
};

export {
    getAllUsers,
    getOneUser,
    addUser,
    deleteUser,
    updateUser,
};
