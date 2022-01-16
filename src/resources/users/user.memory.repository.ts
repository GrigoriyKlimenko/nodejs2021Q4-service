import { getRepository } from 'typeorm';
import { UsersModel } from './user.model';

interface IUser {
    id: string;
    name: string;
    login: string;
    password: string;
}
const users: IUser[] = [];

const getAll = async (): Promise<UsersModel[]> => {
    const userRepository = getRepository(UsersModel);
    const users = await userRepository.find();
    return users;
};
const getById = async (id: string): Promise<UsersModel | undefined> => {
    const userRepository = getRepository(UsersModel);
    const user = await userRepository.findOne(id);
    return user;
};
const addUser = async (user: UsersModel): Promise<UsersModel> => {
    const userNew = await getRepository(UsersModel).save(user);
    return userNew;
};
const updateUser = async (user: UsersModel): Promise<UsersModel> => {
    const userApd = await getRepository(UsersModel).save(user);
    return userApd;
};
const deleteById = async (id: string): Promise<void> => {
    const removeResult = await getRepository(UsersModel).delete(id);
    // if (removeResult.affected === 0) throw new MyError(`Error delete By Id ${id} User`, 'error', 404);
};
const usersRepositoryActions = {getAll, getById, addUser, updateUser, deleteById};

export {
    users, 
    IUser,
    usersRepositoryActions
};