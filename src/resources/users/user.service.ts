import { FastifyRequest, FastifyReply } from 'fastify';
import uuid from 'uuid';
import { resetTaskExecutor } from '../tasks/tasks.service';
import {users, IUser} from './user.memory.repository';

type UserRequest = FastifyRequest <{
    Params: {
        userId: string;
    }
    Body: {
        name: string;
        login: string;
        password: string;
    }
}>

let usersRepo = users;

const getAllUsers = (_req: UserRequest, res: FastifyReply) => {
    res.send(usersRepo);
};

const getOneUser = (req: UserRequest, res: FastifyReply) => {
    const { userId } = req.params;
    const user = usersRepo.find((userItem: IUser) => userItem.id === userId);
    res.send(user);
};

const addUser = (req: UserRequest, res: FastifyReply) => {
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

const deleteUser = (req: UserRequest, res: FastifyReply) => {
    const { userId } = req.params;
    usersRepo = usersRepo.filter((user) => user.id !== userId);
    resetTaskExecutor(userId);
    res.code(204).send();
};

const updateUser = (req: UserRequest, res: FastifyReply) => {
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
