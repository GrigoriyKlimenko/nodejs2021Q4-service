const { getAllUsers, getOneUser } = require('./user.service');

const getUsersSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
            login: {type: 'string'},
          }
        }
      }
    }
  },
  handler: getAllUsers
}

const getOneUserSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
            login: {type: 'string'},
          }
      }
    }
  },
  handler: getOneUser
}

module.exports = {
  getUsersSchema,
  getOneUserSchema
};
