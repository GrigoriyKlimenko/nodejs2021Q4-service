import { v4 as uuid } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IBoard } from "./boards.memory.repository";
import { BoardsModel } from './boards.model';

interface IColumn {
  id: string;
  title: string;
  order: number;
  board: IBoard
}

@Entity({ name: 'columns' })
class ColumnsModel implements IColumn{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, default: '' })
  title: string;

  @Column('integer', { default: 0 })
  order: number;

  @ManyToOne(() => BoardsModel, board => board.columns)
  board: BoardsModel;

  constructor(id: string = uuid(), title: string = '', order: number = 0, board: BoardsModel) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.board = board;
  }
}

export {
  ColumnsModel,
  IColumn
}