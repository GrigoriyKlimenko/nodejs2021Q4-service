import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;
  
    @Column('varchar', { length: 100, nullable: false })
    public name!: string;
  
    @Column('varchar', { length: 100, nullable: false })
    public login!: string;
  
    @Column('varchar', { length: 100, nullable: false, select: false })
    public password!: string;

    @OneToMany(() => Task, (task: Task) => task.user)
    public tasks!: Task[];
}