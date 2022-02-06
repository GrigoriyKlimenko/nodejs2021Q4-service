import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Board } from './board.entity';
import { Task } from '../../tasks/entities/task.entity';
import { ITask } from '../../tasks/interfaces/task.interface';
import { IBoard } from '../interfaces/board.interface';

@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar', { length: 255, default: '' })
    title!: string;

    @Column('integer', { default: 0 })
    order!: number;

    @OneToMany(() => Task, (task) => task.column, {
        eager: true,
        cascade: true,
    })
    tasks!: ITask[];

    @ManyToOne(() => Board, board => board.columns, {
        onDelete: 'CASCADE',
    })
    board!: IBoard;
}