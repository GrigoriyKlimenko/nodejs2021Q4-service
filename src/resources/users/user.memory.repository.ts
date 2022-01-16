import { getRepository } from 'typeorm';
import { UsersModel } from './user.model';

interface IUser {
    id: string;
    name: string;
    login: string;
    password: string;
}

const getAll = async (): Promise<IUser[]> => {
    const userRepository = getRepository(UsersModel);
    const users = await userRepository.find();
    return users;
};
const getById = async (id: string): Promise<IUser | undefined> => {
    const userRepository = getRepository(UsersModel);
    const user = await userRepository.findOne(id);
    return user;
};
const addUser = async (user: IUser): Promise<IUser> => {
    const userNew = await getRepository(UsersModel).save(user);
    return userNew;
};
const updateUser = async (user: IUser): Promise<IUser> => {
    const userApd = await getRepository(UsersModel).save(user);
    return userApd;
};
const deleteById = async (id: string): Promise<void> => {
    const removeResult = await getRepository(UsersModel).delete(id);
};

const usersRepositoryActions = {getAll, getById, addUser, updateUser, deleteById};

export {
    IUser,
    usersRepositoryActions
};