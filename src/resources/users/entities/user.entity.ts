import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}