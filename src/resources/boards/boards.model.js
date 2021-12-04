const { getAllBoards, getOneBoard, addBoard, deleteBoard, updateBoard } = require('./boards.service');

const getBoardsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {type: 'string'},
            title: {type: 'string'},
            columns: {type: 'array'},
          }
        }
      }
    }
  },
  handler: getAllBoards,
}

const getOneBoardSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
          properties: {
            id: {type: 'string'},
            title: {type: 'string'},
            columns: {type: 'array'},
          }
      }
    }
  },
  handler: getOneBoard,
}

const addBoardSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: {type: 'string'},
        columns: {type: 'array'},
      }
    },
    response: {
      201: {
        type: 'object',
          properties: {
            id: {type: 'string'},
            title: {type: 'string'},
            columns: {type: 'array'},
          }
      }
    }
  },
  handler: addBoard,
}

const deleteBoardSchema = {
  schema: {
    response: {
      204: {
        type: "object",
        description: 'Success'
      },
    },
  },
  handler: deleteBoard,
}

const updateBoardSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: {type: 'string'},
        columns: {type: 'array'},
      }
    },
    response: {
      200: {
        type: 'object',
          properties: {
            id: {type: 'string'},
            title: {type: 'string'},
            columns: {type: 'array'},
          }
      }
    }
  },
  handler: updateBoard,
}

module.exports = {
  getBoardsSchema,
  getOneBoardSchema,
  addBoardSchema,
  deleteBoardSchema,
  updateBoardSchema,
};
