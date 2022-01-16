import { v4 as uuid } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { getAllUsers, getOneUser, addUser, deleteUser, updateUser } from './user.service';
import { IUser } from "./user.memory.repository";

@Entity({ name: 'users' })
class UsersModel implements IUser{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, default: 'User' })
  name: string;

  @Column('varchar', { length: 255, default: 'Login' })
  login: string;

  @Column('varchar', { length: 255, default: 'Password', select: false })
  password: string;

  constructor(id: string = uuid(), name: string = 'User', login: string = 'Login', password: string = 'Password') {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

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
  UsersModel
};
