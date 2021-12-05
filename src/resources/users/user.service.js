const uuid = require('uuid');
const { resetTaskExecutor } = require('../tasks/tasks.service');
let usersRepo = require('./user.memory.repository');

const getAllUsers = (req, res) => {
    res.send(usersRepo);
};

const getOneUser = (req, res) => {
    const { userId } = req.params;
    const user = usersRepo.find((userItem) => userItem.id === userId);
    res.send(user);
};

const addUser = (req, res) => {
    const { name, login, password } = req.body;
    const user = {
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

module.exports = {
    getAllUsers,
    getOneUser,
    addUser,
    deleteUser,
    updateUser,
};
