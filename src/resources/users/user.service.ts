import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import logger from '../../common/logger';
import { IUser, usersRepositoryActions } from './user.memory.repository';
import { SALT_ROUNDS } from '../../common/config';

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

const addDefaultUser = async () => {
    const defaultUser = await usersRepositoryActions.addDefaultUser({
        id: v4(),
        name: 'User',
        login: 'admin',
        password: await bcrypt.hash('admin', SALT_ROUNDS),
    });
    if (defaultUser) {
        logger.info(`Default user - admin:admin`);
    } else {
        throw new Error ('Default user add problem');
    }
}

/**
   * This function initiate response with all Users in DB and 200 status
   * @param req - optional request param
   * @param res - param for response
*/
const getAllUsers = async (_req: UserRequest, res: FastifyReply) => {
    const users = await usersRepositoryActions.getAll();
    res.send(users);
};

/**
   * This function initiate response with User by ID and 200 status
   * If user not founded - initiate response with 404 status and message
   * @param req - request param with userId
   * @param res - param for response
*/
const getOneUser = async (req: UserRequest, res: FastifyReply) => {
    const { userId } = req.params;
    const user = await usersRepositoryActions.getById(userId);
    res.send(user);
};

/**
   * This function add new User record to DB
   * and initiate response with new record and 201 status
   * @param req - request param with body data
   * @param res - param for response
*/
const addUser = async (req: UserRequest, res: FastifyReply) => {
    const { name, login, password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user: IUser = {
        id: v4(),
        name,
        login,
        password: cryptedPassword,
    }

    await usersRepositoryActions.addUser(user);
    res.code(201).send(user);
};

/**
   * This function delete User by ID 
   * and initiate resetTaskExecutor function
   * and initiate response with 204 status
   * @param req - request param with userId
   * @param res - param for response
*/
const deleteUser = async (req: UserRequest, res: FastifyReply) => {
    const { userId } = req.params;
    await usersRepositoryActions.deleteById(userId);
    res.code(204).send();
};

/**
   * This function update User record with new params 
   * and initiate response with new record and 200 status
   * @param req - request param with userId and body with other data
   * @param res - param for response
*/
const updateUser = async (req: UserRequest, res: FastifyReply) => {
    const { userId } = req.params;
    const { name, login, password } = req.body;
    const updatedUser = {
        id: userId,
        name,
        login,
        password
    }
    
    const userToResp = await usersRepositoryActions.updateUser(updatedUser);
    res.code(200).send(userToResp);
};

export {
    getAllUsers,
    getOneUser,
    addUser,
    deleteUser,
    updateUser,
    addDefaultUser
};
