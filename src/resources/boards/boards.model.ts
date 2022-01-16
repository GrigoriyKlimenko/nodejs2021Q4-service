import { v4 as uuid } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IBoard } from "./boards.memory.repository";
import { ColumnsModel } from './columns.model';
import { getAllBoards, getOneBoard, addBoard, deleteBoard, updateBoard } from './boards.service';

@Entity({ name: 'boards' })
class BoardsModel implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, default: '' })
  title: string;

  @OneToMany(() => ColumnsModel, column => column.board)
  columns: ColumnsModel[];

  constructor(id: string = uuid(), title: string = 'string', columns: ColumnsModel[]) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

const getBoardsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            columns: { type: 'array' },
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
          id: { type: 'string' },
          title: { type: 'string' },
          columns: { type: 'array' },
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
        title: { type: 'string' },
        columns: { type: 'array' },
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          columns: { type: 'array' },
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
        title: { type: 'string' },
        columns: { type: 'array' },
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          columns: { type: 'array' },
        }
      }
    }
  },
  handler: updateBoard,
}

export {
  getBoardsSchema,
  getOneBoardSchema,
  addBoardSchema,
  deleteBoardSchema,
  updateBoardSchema,
  BoardsModel
};
