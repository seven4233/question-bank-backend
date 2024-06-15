import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Bank {
    @PrimaryGeneratedColumn()
    id: number;

    // 年份
    @Column()
    year: string;

    @Column()
    name: string;
 
    @Column({type: 'int', default: 0})
    fever: number;

    @CreateDateColumn()
    createdAt: Date

}
