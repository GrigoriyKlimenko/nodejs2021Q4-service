let usersRepo = require('./user.memory.repository');
const uuid = require('uuid');

const getAllUsers = (req, res) => {
    res.send(usersRepo);
};

const getOneUser = (req, res) => {
    const { userId } = req.params;
    let user = usersRepo.find((user) => user.id === userId);
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
    res.code(204).send();
};

const updateUser = (req, res) => {
    const { userId } = req.params;
    console.log('>>>>>>>>>>>>>>>', userId);
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
