import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinTable, AfterLoad } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { ColumnEntity } from './column.entity';
import { IColumn } from '../interfaces/column.interface';

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column('varchar', { length: 255, default: '' })
    public title!: string;

    @OneToMany(() => ColumnEntity, column => column.board, {
        eager: true,
        cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
    })
    @JoinTable()
    columns!: IColumn[];

    @OneToMany(() => Task, (task: Task) => task.board)
    public tasks!: Task[];

    @AfterLoad()
    sortItems(): void {
        if (this.columns.length > 0) {
            this.columns.sort((a, b) => a.order - b.order);
        }
    }
}