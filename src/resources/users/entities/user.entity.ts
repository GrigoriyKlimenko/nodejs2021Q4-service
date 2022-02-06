import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";
import { IUser } from "../interfaces/user.interface";

export type UserToResponse = Omit<IUser, 'password'>;

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;
  
    @Column('varchar', { length: 100, nullable: false })
    public name!: string;
  
    @Column('varchar', { length: 100, nullable: false })
    public login!: string;
  
    @Column('varchar', { length: 100, nullable: false })
    public password!: string;

    @OneToMany(() => Task, (task: Task) => task.user)
    public tasks!: Task[];

    static toResponse(user: User): UserToResponse {
        const { id, name, login } = user;
        return { id, name, login };
    }
}