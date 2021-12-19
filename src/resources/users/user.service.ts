import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 } from 'uuid';
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

/**
   * This function initiate response with all Users in DB and 200 status
   * @param req - optional request param
   * @param res - param for response
*/
const getAllUsers = (_req: UserRequest, res: FastifyReply) => {
    res.send(usersRepo);
};

/**
   * This function initiate response with User by ID and 200 status
   * If user not founded - initiate response with 404 status and message
   * @param req - request param with userId
   * @param res - param for response
*/
const getOneUser = (req: UserRequest, res: FastifyReply) => {
    const { userId } = req.params;
    const user = usersRepo.find((userItem: IUser) => userItem.id === userId);
    res.send(user);
};

/**
   * This function add new User record to DB
   * and initiate response with new record and 201 status
   * @param req - request param with body data
   * @param res - param for response
*/
const addUser = (req: UserRequest, res: FastifyReply) => {
    const { name, login, password } = req.body;
    const user: IUser = {
        id: v4(),
        name,
        login,
        password
    }

    usersRepo.push(user);
    res.code(201).send(user);
};

/**
   * This function delete User by ID 
   * and initiate resetTaskExecutor function
   * and initiate response with 204 status
   * @param req - request param with userId
   * @param res - param for response
*/
const deleteUser = (req: UserRequest, res: FastifyReply) => {
    const { userId } = req.params;
    usersRepo = usersRepo.filter((user) => user.id !== userId);
    resetTaskExecutor(userId);
    res.code(204).send();
};

/**
   * This function update User record with new params 
   * and initiate response with new record and 200 status
   * @param req - request param with userId and body with other data
   * @param res - param for response
*/
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
