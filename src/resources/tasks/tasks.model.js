const { getAllTasks, getOneTask, addTask, deleteTask, updateTask } = require('./tasks.service');

const getTasksSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            title: {type: 'string'},
            order: {type: 'number'},
            description: {type: 'string'},
            userId: {type: ['string', 'null']},
            boardId: {type: ['string', 'null']},
            columnId: {type: ['string', 'null']},
          }
        }
      }
    }
  },
  handler: getAllTasks,
}

const getOneTaskSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
          properties: {
            id: {type: 'string'},
            title: {type: 'string'},
            order: {type: 'number'},
            description: {type: 'string'},
            userId: {type: ['string', 'null']},
            boardId: {type: ['string', 'null']},
            columnId: {type: ['string', 'null']},
          }
      }
    }
  },
  handler: getOneTask,
}

const addTaskSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'order', 'description', 'userId', 'boardId'],
      properties: {
        title: {type: 'string'},
        order: {type: 'number'},
        description: {type: 'string'},
        userId: {type: ['string', 'null']},
        boardId: {type: ['string', 'null']},
        columnId: {type: ['string', 'null']},
      }
    },
    response: {
      201: {
        type: 'object',
          properties: {
            id: {type: 'string'},
            title: {type: 'string'},
            order: {type: 'number'},
            description: {type: 'string'},
            userId: {type: ['string', 'null']},
            boardId: {type: ['string', 'null']},
            columnId: {type: ['string', 'null']},
          }
      }
    }
  },
  handler: addTask,
}

const deleteTaskSchema = {
  schema: {
    response: {
      204: {
        type: "object",
        description: 'Success'
      },
    },
  },
  handler: deleteTask,
}

const updateTaskSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'order', 'description', 'userId', 'boardId', 'columnId'],
      properties: {
        title: {type: 'string'},
        order: {type: 'number'},
        description: {type: 'string'},
        userId: {type: ['string', 'null']},
        boardId: {type: ['string', 'null']},
        columnId: {type: ['string', 'null']},
      }
    },
    response: {
      200: {
        type: 'object',
          properties: {
            id: {type: 'string'},
            title: {type: 'string'},
            order: {type: 'number'},
            description: {type: 'string'},
            userId: {type: ['string', 'null']},
            boardId: {type: ['string', 'null']},
            columnId: {type: ['string', 'null']},
          }
      }
    }
  },
  handler: updateTask,
}

module.exports = {
  getTasksSchema,
  getOneTaskSchema,
  addTaskSchema,
  deleteTaskSchema,
  updateTaskSchema,
};
