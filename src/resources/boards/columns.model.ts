import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { IBoard } from './boards.memory.repository';
import { BoardsModel } from './boards.model';
import { TasksModel } from '../tasks/tasks.model';

interface IColumn {
    id: string;
    title: string;
    order: number;
    board: IBoard
}

@Entity({ name: 'columns' })
class ColumnsModel implements IColumn {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 255, default: '' })
    title!: string;

    @Column('integer', { default: 0 })
    order!: number;

    @OneToMany(() => TasksModel, (task) => task.column, {
        eager: true,
        cascade: true,
    })
    tasks!: TasksModel[];

    @ManyToOne(() => BoardsModel, board => board.columns, {
        onDelete: 'CASCADE',
    })
    board!: BoardsModel;
}

export {
    ColumnsModel,
    IColumn
}