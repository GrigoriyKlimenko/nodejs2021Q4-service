import { getAllUsers, getOneUser, addUser, deleteUser, updateUser } from './user.service';

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
  handler: getAllUsers,
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
  handler: getOneUser,
}

const addUserSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: {type:'string'},
        login: {type:'string'},
        password: {type:'string'},
      }
    },
    response: {
      201: {
        type: 'object',
          properties: {
            id: {type: 'string'},
            name: {type: 'string'},
            login: {type: 'string'},
          }
      }
    }
  },
  handler: addUser,
}

const deleteUserSchema = {
  schema: {
    response: {
      204: {
        type: "object",
        description: 'Success'
      },
    },
  },
  handler: deleteUser,
}

const updateUserSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: {type:'string'},
        login: {type:'string'},
        password: {type:'string'},
      }
    },
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
  handler: updateUser,
}

export {
  getUsersSchema,
  getOneUserSchema,
  addUserSchema,
  deleteUserSchema,
  updateUserSchema,
};
