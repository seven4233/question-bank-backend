import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, TableColumn } from "typeorm";


@Entity()
export class UserComment {

  @PrimaryGeneratedColumn()
  id: number;

  // 用户id
  @Column()
  user_id: number;

  // 题库id
  @Column()
  bank_id: number;

  // 题号
  @Column()
  question_num: string


  @Column({nullable: true})
  question_sort: string

  // 评论内容
  @Column()
  content: string

  @CreateDateColumn()
  createdAt: Date

}
