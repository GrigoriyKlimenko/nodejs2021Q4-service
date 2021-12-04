const usersRepo = require('./user.memory.repository');
const uuid = require('uuid');

const getAllUsers = (req, res) => {
    res.send(usersRepo)
};

const getOneUser = (req, res) => {
    const { userId } = req.params;
    let user = usersRepo.find((user) => user.id === userId);

    res.send(user)
  };

module.exports = {
    getAllUsers,
    getOneUser
};
