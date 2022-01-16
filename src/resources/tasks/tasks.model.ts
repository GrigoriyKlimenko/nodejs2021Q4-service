import { v4 as uuid } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { getAllTasks, getOneTask, addTask, deleteTask, updateTask } from './tasks.service';
import { ITask } from './tasks.memory.repository';

@Entity({ name: 'tasks' })
class TasksModel implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column('varchar', { length: 255, default: '' })
  title: string;

  @Column('integer', { default: 0 })
  order: number;

  @Column('varchar', { length: 255, default: '' })
  description: string;

  @Column('varchar', { length: 255, default: null, nullable: true })
  userId: string | null;

  @Column('varchar', { length: 255, default: null, nullable: true })
  boardId: string | null;

  @Column('varchar', { length: 255, default: null, nullable: true })
  columnId: string | null;

  constructor(id: string = uuid(), title: string = '', order: number = 0, description: string = '', userId: string | null,
    boardId: string, columnId: string) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

const getTasksSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            order: { type: 'number' },
            description: { type: 'string' },
            userId: { type: ['string', 'null'] },
            boardId: { type: ['string', 'null'] },
            columnId: { type: ['string', 'null'] },
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
          id: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'number' },
          description: { type: 'string' },
          userId: { type: ['string', 'null'] },
          boardId: { type: ['string', 'null'] },
          columnId: { type: ['string', 'null'] },
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
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: ['string', 'null'] },
        columnId: { type: ['string', 'null'] },
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'number' },
          description: { type: 'string' },
          userId: { type: ['string', 'null'] },
          boardId: { type: ['string', 'null'] },
          columnId: { type: ['string', 'null'] },
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
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: ['string', 'null'] },
        columnId: { type: ['string', 'null'] },
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'number' },
          description: { type: 'string' },
          userId: { type: ['string', 'null'] },
          boardId: { type: ['string', 'null'] },
          columnId: { type: ['string', 'null'] },
        }
      }
    }
  },
  handler: updateTask,
}

export {
  getTasksSchema,
  getOneTaskSchema,
  addTaskSchema,
  deleteTaskSchema,
  updateTaskSchema,
  TasksModel
};
