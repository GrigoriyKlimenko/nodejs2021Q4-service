import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, AfterLoad } from 'typeorm';
import { IBoard } from './boards.memory.repository';
import { ColumnsModel } from './columns.model';
import { getAllBoards, getOneBoard, addBoard, deleteBoard, updateBoard } from './boards.service';
import { TasksModel } from '../tasks/tasks.model';

@Entity({ name: 'boards' })
class BoardsModel implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255, default: '' })
  title!: string;

  @OneToMany(() => ColumnsModel, column => column.board, {
    eager: true,
    cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
  })
  @JoinTable()
  columns!: ColumnsModel[];

  @OneToMany(() => TasksModel, (task) => task.board, {
    eager: false,
  })
  tasks!: TasksModel[];

  @AfterLoad()
  sortItems(): void {
    if (this.columns.length > 0) {
      this.columns.sort((a, b) => a.order - b.order);
    }
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
