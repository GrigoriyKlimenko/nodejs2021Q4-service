import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Board } from '../../boards/entities/board.entity';
import { ColumnEntity } from '../../boards/entities/column.entity';
import { IColumn } from '../../boards/interfaces/column.interface';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column('varchar', { length: 255, default: '' })
    public title!: string;

    @Column('integer', { default: 0 })
    public order!: number;

    @Column('varchar', { length: 255, default: '' })
    public description!: string;

    @Column('varchar', { default: null, nullable: true })
    public userId!: string | null;

    @ManyToOne(() => User, (user: User) => user.tasks, {
        eager: false,
        onDelete: 'SET NULL',
    })
    public user!: User;

    @ManyToOne(() => Board, (board: Board) => board.tasks, {
        eager: false,
        onDelete: 'CASCADE',
    })
    public board!: Board;

    @Column('varchar', { nullable: true })
    public boardId!: string | null;

    @ManyToOne(() => ColumnEntity, (column) => column.tasks, {
        eager: false,
    })
    column!: IColumn;
    @Column('varchar', { nullable: true })
    public columnId!: string | null;
}
    // @ManyToOne(() => UsersModel, (user) => user.tasks, {
    //     eager: false,
    //     onDelete: 'SET NULL',
    // })
    // user!: UsersModel;

    // @Column('varchar', { default: null, nullable: true })
    // userId!: string | null;